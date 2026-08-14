import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateManageUserDto } from './dto/create-manage-user.dto';
import { UpdateManageUserDto } from './dto/update-manage-user.dto';
import { Model } from 'mongoose';
import { UserDocument } from 'src/auth_autho/auth.schema';
import * as bcrypt from 'bcrypt'
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class ManageUsersService {
  constructor(@InjectModel('auth_authos') private readonly userModel: Model<UserDocument>) { }
  async create(createManageUserDto: CreateManageUserDto) {
    const { username, role, email } = createManageUserDto
    const check = await this.userModel.findOne({ username })
    if (check) throw new HttpException("user already exist", 404)
    const hashpass = await bcrypt.hash(createManageUserDto.password, 10)
    const data = await this.userModel.create({
      username,
      role,
      email,
      password: hashpass,
    })

    return data;
  }

  async getallusers() {
    const data = await this.userModel.find({ emailVerified: true });
    return data
  }

  findOne(id: number) {
    return `This action returns a #${id} manageUser`;
  }

  async update(id: string, updateManageUserDto: UpdateManageUserDto) {
    const user = await this.userModel.findById(id)
    if (!user)
      throw new HttpException("user not found", 404)
    const data = await this.userModel.findOneAndUpdate({ _id: id }, { ...updateManageUserDto }, { new: true });
    return data;
  }


}
