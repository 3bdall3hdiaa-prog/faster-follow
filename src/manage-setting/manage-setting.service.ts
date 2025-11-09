import { Injectable } from '@nestjs/common';
import { CreateManageSettingDto } from './dto/create-manage-setting.dto';
import { UpdateManageSettingDto } from './dto/update-manage-setting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SiteSettings } from './schema';
import { Model } from 'mongoose';
@Injectable()
export class ManageSettingService {
  constructor(@InjectModel('ManageSetting') private readonly userModel: Model<SiteSettings>) { }
  async create(createManageSettingDto: CreateManageSettingDto) {
    const create = await this.userModel.create(createManageSettingDto);
    return create
  }

  async findAll() {
    const data = await this.userModel.find().select('-_id -__v -createdAt -updatedAt');
    return data
  }



  async update(updateManageSettingDto: UpdateManageSettingDto) {
    const data = await this.userModel.find({})

    const update = await this.userModel.findOneAndUpdate({ _id: data[0]._id }, { ...updateManageSettingDto }, { new: true });
    return update
  }


}
