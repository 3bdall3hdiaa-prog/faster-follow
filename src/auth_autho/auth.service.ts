import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../auth/auth.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDocument } from 'src/resetpassword/resetpassword.schema';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class AuthService {


  constructor(@InjectModel("auth_authos") private modell: Model<UserDocument>, private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) { }
  async signup(createAuthDto: CreateAuthDto) {
    const { username, email, password } = createAuthDto;
    const check = await this.modell.findOne({ username })
    if (check) throw new HttpException("  هذا الاسم موجود بالفعل", 404);
    const checkEmail = await this.modell.findOne({ email })
    if (checkEmail) throw new HttpException("  الايميل موجود بالفعل", 404);
    if (!username || !password) throw new HttpException("    اسم المستخدم وكلمة السر مطلوبة", 404);
    const hashpassword = await bcrypt.hash(password, 10)
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const sendCode = await this.mailerService.sendMail({
      from: `"متوفر برو" <${process.env.EMAIL_USERNAME}>`,
      to: createAuthDto.email,
      subject: "Code Verification",
      text: `Your verification code is ${code}`,
      html: `
    <div>
      <h2>متوفر برو</h2>
      <p>Your verification code is:</p>
      <h1>${code}</h1>
      <p>This code will expire soon.</p>
    </div>
  `,
    });
    if (!sendCode) throw new HttpException("code not sent", 404);
    const user = await this.modell.create({
      username, email, password: hashpassword, role: "client", provider: "local", otp: {
        code,
        expiry: new Date(Date.now() + 15 * 60 * 1000)
      }
    });
    if (!user) throw new HttpException("user not created", 404);

    return {
      status: 200,
      message: "code sent successfully",
    };
  }
  async login(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;
    if (!username || !password) throw new HttpException(" يلزم ادخال الايميل والباسورد", 404);
    const user: any = await this.modell.findOne({ username });
    if (!user) throw new HttpException("المستخدم ليس موجود", 404);
    if (user.emailVerified == false) throw new HttpException("الحساب غير مفعل", 404);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new HttpException("  كلمة السر غير صحيح", 404);
    if (user.status == 'inactive') {
      throw new HttpException("الحساب غير موجود", 404);
    }
    if (user.status == 'banned') {
      throw new HttpException("الحساب محظور", 404);
    }
    /////////
    const payload = {
      _id: user._id,
      username: user.username,
      role: user.role,
      email: user.email
    }
    const token = await this.jwtService.signAsync(payload, { secret: process.env.secret })
    if (!token) throw new Error("user not found");
    return {
      status: 200,
      message: "user logged in",
      token: token
    };

  }




  // async update2fa(createAuthDto: any) {
  //   const { is2FA } = createAuthDto
  //   const getuser = await this.modell.findOne({ username: createAuthDto.username })
  //   if (!getuser) throw new HttpException("user not found", 404);
  //   const update = await this.modell.findOneAndUpdate({ username: createAuthDto.username }, { is2FA }, { new: true })
  //   if (!update) throw new HttpException("user not found", 404);

  //   return {
  //     message: "2fa enabled",
  //     data: update
  //   }

  // }
  async verifyOtp({ email, code }: any) {
    console.log(email, code);
    if (!email || !code) throw new HttpException("email and code are required", 404);
    const user: any = await this.modell.findOne({ email })
    if (user.otp.code != String(code)) {
      throw new HttpException("code not matched", 404)
    }
    if (user.otp.expiry < new Date()) {
      throw new HttpException("code expired", 404)
    }
    user.emailVerified = true
    user.otp = {
      code: null,
      expiry: null
    }
    await user.save()

    const payload = {
      _id: user?._id,
      username: user?.username,
      email: user?.email,
      role: user?.role
    }
    const token = await this.jwtService.signAsync(payload, { secret: process.env.secret })
    if (!token) throw new HttpException("token not found", 404);
    return {
      status: 200,
      message: "account verified successfully",
      token: token
    };
  }

}