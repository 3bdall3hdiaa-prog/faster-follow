import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/auth/auth.schema';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class ResetpasswordService {
  constructor(@InjectModel('auth_authos') private readonly userModel: Model<UserDocument>,
    private readonly mailerService: MailerService,
    private jwtService: JwtService) { }


  async create(createResetpasswordDto: { email: string }) {

    const { email } = createResetpasswordDto;


    const user = await this.userModel.findOne({ email });
    if (!user) throw new HttpException("user not found", 404);

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const sendCode = await this.mailerService.sendMail({
      from: `متوفر برو.com <${process.env.EMAIL_USERNAME}>`,
      to: user.email,
      subject: "Code Verification",
      text: `Your code is ${code}`,
    });
    if (!sendCode) throw new HttpException("code not sent", 404);
    const addcode = await this.userModel.findOneAndUpdate({ email }, { otp: { code, expiry: new Date(Date.now() + 15 * 60 * 1000) } }, { new: true });
    if (!addcode) throw new HttpException("code not added", 404);
    return {
      message: "Code sent successfully",
      status: 200,
      success: true
    };
  }




  async changePassword(updateResetpasswordDto: any) {
    const { email } = updateResetpasswordDto
    const user = await this.userModel.findOne({ email })
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
