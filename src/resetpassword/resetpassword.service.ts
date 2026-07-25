import { HttpException, Injectable } from '@nestjs/common';
import { CreateResetpasswordDto } from './dto/create-resetpassword.dto';
import { UpdateResetpasswordDto } from './dto/update-resetpassword.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResetPasswordDocument } from './resetpassword.schema';
import { UserDocument } from 'src/auth_autho/auth.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { ChangePassword } from './dto/create-resetpassword.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class ResetpasswordService {
  constructor(@InjectModel('Resetpassword') private readonly userModel: Model<ResetPasswordDocument>,
    @InjectModel("auth_autho") private data: Model<UserDocument>, private readonly mailerService: MailerService,
    private jwtService: JwtService) { }


  async create(createResetpasswordDto: CreateResetpasswordDto) {
    const { email } = createResetpasswordDto
    const user = await this.data.findOne({ email })
    if (!user) throw new HttpException("user not found", 404);
    const code = Math.floor(Math.random() * 1000000).toString()
    const addcode = await this.userModel.create({ verificationCode: code, email: user.email })
    if (!addcode) throw new HttpException("code not added", 404);
    //send code to user email
    await this.mailerService.sendMail({
      from: `fasterfollowers.com<${process.env.EMAIL_USERNAME}>`,
      to: user.email,
      subject: 'Code Verification',
      text: `Your code is ${code}`,
    });

    return {
      message: "Code sent successfully",
    }
  }
  async verifyCode(code: any) {
    const { verificationCode } = code
    const user: any = await this.userModel.findOne({ verificationCode })
    const payload: any = {
      _id: user?._id,
      username: user?.username,
      role: user?.role,
    }
    const token = await this.jwtService.signAsync(payload, { secret: process.env.secret })
    if (!token) throw new HttpException("user ttt found", 404);
    if (!user) throw new HttpException("code not verified", 404)
    return {
      message: "Code verified successfully",
      token: token
    }

  }



  async changePassword(updateResetpasswordDto: ChangePassword) {
    const { email } = updateResetpasswordDto
    const user = await this.data.findOne({ email })
    if (!user) throw new Error("user not found")
    const { password } = updateResetpasswordDto
    const hashpassword = await bcrypt.hash(password, 10)
    user.password = hashpassword
    await user.save()
    return {
      message: "Password changed successfully",
    }
  }



}
