// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { OAuth2Client } from 'google-auth-library';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface IUser {
  _id?: string;
  email: string;
  username?: string;
  name?: string;
  picture?: string;
  balance?: number;
  role?: string;
  googleId?: string;
  accessToken?: string;
  emailVerified?: boolean;
  provider?: string;
}

@Injectable()
export class AuthService {
  private oauth2Client: OAuth2Client;

  constructor(
    private jwtService: JwtService,
    private httpService: HttpService,
    @InjectModel('auth_authos') private userModel: Model<IUser>,
  ) {
    this.oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  // دالة حفظ اليوزر فقط
  async saveGoogleUser(googleUser: any): Promise<IUser> {
    const { googleId, email, name, picture, access_token, email_verified } = googleUser;

    // شوف إذا اليوزر موجود
    let user = await this.userModel.findOne({
      $or: [
        { googleId: googleId },
        { email: email }
      ]
    });

    if (user) {
      // update اليوزر الموجود
      user.name = name;
      user.picture = picture;
      user.accessToken = access_token;
      user.emailVerified = email_verified;
      return user.save();
    } else {
      // create يوزر جديد
      const newUser = new this.userModel({
        googleId,
        email,
        name,
        username: email.split('@')[0],
        picture,
        accessToken: access_token,
        emailVerified: email_verified,
        provider: 'google',
        balance: 0,
        role: 'client'
      });
      return newUser.save();
    }
  }

  async generateToken(user: any) {
    const payload = {
      email: user.email,
      sub: user._id,
      name: user.name,
      picture: user.picture,
      role: user.role
    };

    const token = this.jwtService.sign(payload);
    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        username: user.username,
        picture: user.picture,
        balance: user.balance,
        role: user.role
      }
    };
  }

  async getGoogleUser(code: string) {
    try {
      const tokenResp = await firstValueFrom(
        this.httpService.post('https://oauth2.googleapis.com/token',
          new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
            grant_type: 'authorization_code'
          }).toString(),
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          }
        )
      );

      const { access_token, id_token } = tokenResp.data;

      const ticket = await this.oauth2Client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new Error('Invalid ID token');
      }

      // بيانات المستخدم من جوجل
      const googleUserData = {
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        email_verified: payload.email_verified,
        access_token,
      };

      // حفظ المستخدم في الداتابيز
      const user = await this.saveGoogleUser(googleUserData);

      // إرجاع البيانات بدون toObject()
      return {
        _id: user._id,
        email: user.email,
        name: user.name,
        username: user.username,
        picture: user.picture,
        balance: user.balance,
        role: user.role,
        googleId: user.googleId,
        accessToken: user.accessToken,
        emailVerified: user.emailVerified,
        provider: user.provider,
        access_token
      };

    } catch (error) {
      console.error('Error in getGoogleUser:', error);
      throw new UnauthorizedException('Failed to get user data from Google');
    }
  }
}