import { Injectable } from '@nestjs/common';
import { CreateManagepannerDto } from './dto/create-managepanner.dto';
import { UpdateManagepannerDto } from './dto/update-managepanner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ManagePannersDocument } from './managepaners.schema';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
@Injectable()
export class ManagepannersService {
  constructor(@InjectModel('Managepanners') private readonly userModel: Model<ManagePannersDocument>) { }
  async create(createManagepannerDto: CreateManagepannerDto) {
    const createdManagepanner = new this.userModel(createManagepannerDto);
    return await createdManagepanner.save();
  }
  async findAll() {
    const data = await this.userModel.find().select('-__v');
    return data
  }



  async update(id: string, updateManagepannerDto: UpdateManagepannerDto) {
    const check = await this.userModel.findById(id);
    if (!check) throw new HttpException("user not found", 404);
    const update = await this.userModel.findOneAndUpdate({ _id: id }, { ...updateManagepannerDto }, { new: true });
    return update
  }

  async remove(id: string) {
    await this.userModel.findOneAndDelete({ _id: id });
  }
}
