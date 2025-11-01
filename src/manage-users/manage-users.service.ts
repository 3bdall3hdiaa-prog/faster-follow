import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateManageUserDto } from './dto/create-manage-user.dto';
import { UpdateManageUserDto } from './dto/update-manage-user.dto';
import { Model } from 'mongoose';
import { UserDocument } from 'src/auth_autho/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class ManageUsersService {
  constructor(@InjectModel('auth_authos') private readonly userModel: Model<UserDocument>) { }
  create(createManageUserDto: CreateManageUserDto) {
    return 'This action adds a new manageUser';
  }

  async getallusers() {
    const data = await this.userModel.find({});
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

  remove(id: number) {
    return `This action removes a #${id} manageUser`;
  }
}
