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
@Injectable()
export class ResetpasswordService {
  constructor(@InjectModel('Resetpassword') private readonly userModel: Model<ResetPasswordDocument>,
    @InjectModel("auth_autho") private data: Model<UserDocument>, private readonly mailerService: MailerService) { }


  async create(createResetpasswordDto: CreateResetpasswordDto) {
    const { email } = createResetpasswordDto
    const user = await this.data.findOne({ email })
    if (!user) throw new Error("user not found")
    const code = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const addcode = await this.userModel.create({ verificationCode: code, email: user.email })
    if (!addcode) throw new Error("code not added")
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
    const user = await this.userModel.findOne({ verificationCode })
    if (!user) throw new HttpException("code not verified", 404)
    return {
      message: "Code verified successfully",
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
