import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../auth_autho/auth.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserService {
  constructor(@InjectModel('auth_autho') private readonly userModel: Model<UserDocument>) { }



  async update(req: any, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(req["user"]._id)
    const { email } = updateUserDto
    if (!user) throw new Error("user not found");
    const updatedUser = await this.userModel.findOneAndUpdate({ _id: req.user._id }, { $set: { email } }, { new: true });
    return {
      user: updatedUser
    }
  }
  async updatepassword(req: any, updatepasss: UpdateUserDto) {
    const user = await this.userModel.findById(req["user"]._id)
    if (!user) throw new HttpException("المتسخدم ليس موجود", 404);
    const { currentPassword, newPassword, confirmPassword } = updatepasss;
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new HttpException("كلمة السر الحالية غير صحيحة", 404);
    if (newPassword !== confirmPassword) throw new HttpException("كلمة السر غير متطابقة", 404);
    const hashpassword = await bcrypt.hash(newPassword, 10)
    const updatedUser = await this.userModel.findOneAndUpdate({ _id: req.user._id }, { $set: { password: hashpassword } }, { new: true });
    return {
      user: updatedUser
    }

  }
}
