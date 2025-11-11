import { Injectable } from '@nestjs/common';
import { CreateManageplatformDto } from './dto/create-manageplatform.dto';
import { UpdateManageplatformDto } from './dto/update-manageplatform.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ManagePlatformsDocument } from './schema';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
@Injectable()
export class ManageplatformsService {
  constructor(@InjectModel('ManagePlatforms') private readonly userModel: Model<ManagePlatformsDocument>) { }
  async create(createManageplatformDto: CreateManageplatformDto) {
    const createdata = await this.userModel.create(createManageplatformDto);
    return createdata
  }

  async findAll() {
    const getdata = await this.userModel.find();
    return getdata
  }



  async update(id: string, updateManageplatformDto: UpdateManageplatformDto) {
    const check = await this.userModel.findById(id);
    if (!check) throw new HttpException("user not found", 404);
    const update = await this.userModel.findOneAndUpdate({ _id: id }, { ...updateManageplatformDto }, { new: true });
    return update
  }

  async remove(id: string) {
    await this.userModel.findOneAndDelete({ _id: id });
  }
}
