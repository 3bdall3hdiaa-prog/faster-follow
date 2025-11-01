// src/auth/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.clientID,
            clientSecret: process.env.clientSecret,
            callbackURL: process.env.GOOGLE_REDIRECT_URI,
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { name, emails, photos, id } = profile;

        const user = {
            googleId: id,
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            name: `${name.givenName} ${name.familyName}`,
            picture: photos[0].value,
            accessToken,
            refreshToken,
        };

        done(null, user);
    }
}