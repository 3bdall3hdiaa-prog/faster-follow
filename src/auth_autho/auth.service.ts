import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './auth.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { ResetPasswordDocument } from 'src/resetpassword/resetpassword.schema';
@Injectable()
export class AuthService {
  /*
  لكن في 
  NestJS 
  لازم تعمل 
  Inject 
  لـ JwtService
   من @nestjs/jwt 
   في
    الـ constructor
     وبعدين تستخدمها
      كـ this.jwtService.signAsync(...).
  */
  constructor(@InjectModel("auth_autho") private modell: Model<UserDocument>, private jwtService: JwtService,
    @InjectModel('Resetpassword') private readonly userModel: Model<ResetPasswordDocument>
  ) { }
  async signup(createAuthDto: CreateAuthDto) {
    const { username, email, password } = createAuthDto;
    const check = await this.modell.findOne({ username })
    if (check) throw new HttpException("  المستخدم موجود بالفعل", 404);
    const check_email = await this.modell.findOne({ email })
    if (check_email) throw new HttpException("  الايميل موجود بالفعل", 404);
    if (!username || !password) throw new HttpException("    اسم المستخدم وكلمة السر مطلوبة", 404);
    const hashpassword = await bcrypt.hash(password, 10)
    const user = await this.modell.create({ username, email, password: hashpassword, role: "client" });
    if (!user) throw new HttpException("user not created", 404);
    const payload = {
      _id: user._id,
      // هبعت الوظيفه بتاعت اليوزر في الباي لود
      role: user.role,
    }
    const token = await this.jwtService.signAsync(payload, { secret: process.env.secret })
    if (!token) throw new HttpException("token not created", 404);
    return {
      status: 200,
      message: "user logged in",
      user: user,
      token: token
    };
  }
  async login(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;
    if (!username || !password) throw new HttpException(" يلزم ادخال الايميل والباسورد", 404);
    const user = await this.modell.findOne({ username });
    if (!user) throw new HttpException("المستخدم ليس موجود", 404);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new HttpException("  كلمة السر غير صحيح", 404);
    if (user.status == 'inactive') {
      throw new HttpException("الحساب غير موجود", 404);
    }
    if (user.status == 'banned') {
      throw new HttpException("الحساب محظور", 404);
    }
    // 2fa
    if (user.is2FA === true) {
      await axios.post(`${process.env.DOMAIN_BACKEND}/resetpassword`, { email: user.email });
      return {
        status: 200,
        message: "2fa enabled",
      }


    }

    /////////
    const payload = {
      _id: user._id,
      username: user.username,
      // هبعت الوظيفه بتاعت اليوزر في الباي لود
      role: user.role,
    }
    const token = await this.jwtService.signAsync(payload, { secret: process.env.secret })
    if (!token) throw new Error("user not found");
    return {
      status: 200,
      message: "user logged in",
      user: user,
      token: token
    };

  }
  // async update(createAuthDto: UpdateAuthDto) {
  //   const { username, email, } = createAuthDto;
  //   const user = await this.modell.findOne({ username });
  //   if (!user) throw new HttpException("user not found", 404);
  //   const updatedUser = await this.modell.findOneAndUpdate({ username }, { $set: { email } }, { new: true });
  //   return {
  //     status: 200,
  //     message: "user updated",
  //     user: updatedUser
  //   };

  // }



  async update2fa(createAuthDto: any) {
    const { is2FA } = createAuthDto
    const getuser = await this.modell.findOne({ username: createAuthDto.username })
    if (!getuser) throw new HttpException("user not found", 404);
    const update = await this.modell.findOneAndUpdate({ username: createAuthDto.username }, { is2FA }, { new: true })
    if (!update) throw new HttpException("user not found", 404);
    // if (getuser.is2FA === true) {
    //   return {
    //     message: "2fa already enabled"
    //   }
    // }
    // else {
    //   getuser.is2FA = true
    // }
    // await getuser.save()
    return {
      message: "2fa enabled",
      data: update
    }

  }
  async verify2fa(code: any) {
    const { verificationCode, username } = code
    const user = await this.userModel.findOne({ verificationCode })
    if (!user) throw new HttpException("code not verified", 404)
    const dataauser = await this.modell.findOne({ username })
    const payload = {
      _id: dataauser?._id,
      username: dataauser?.username,
      // هبعت الوظيفه بتاعت اليوزر في الباي لود
      role: dataauser?.role,
    }
    const token = await this.jwtService.signAsync(payload, { secret: process.env.secret })
    if (!token) throw new HttpException("user ttt found", 404);
    return {
      status: 200,
      message: "user logged in",
      user: dataauser,
      token: token
    };
  }

}