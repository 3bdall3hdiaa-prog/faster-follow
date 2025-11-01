import { Injectable } from '@nestjs/common';
import { CreateManagepageDto } from './dto/create-managepage.dto';
import { UpdateManagepageDto } from './dto/update-managepage.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ManagePagesDocument } from './managepages.schema';
import { HttpException } from '@nestjs/common';
@Injectable()
export class ManagepagesService {
  constructor(@InjectModel('ManagePages') private readonly userModel: Model<ManagePagesDocument>) { }
  async create(createManagepageDto: CreateManagepageDto) {
    const data = await this.userModel.create(createManagepageDto);
    return data
  }

  async findAll() {
    const data = await this.userModel.find().select('-updatedAt -__v');
    return data
  }



  async update(id: string, updateManagepageDto: UpdateManagepageDto) {
    const check = await this.userModel.findById(id);
    if (!check) throw new HttpException("user not found", 404);
    const update = await this.userModel.findOneAndUpdate({ _id: id }, { ...updateManagepageDto }, { new: true });
    return update
  }

  async remove(id: string) {
    await this.userModel.findOneAndDelete({ _id: id });
  }
}
