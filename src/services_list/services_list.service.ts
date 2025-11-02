import { Injectable } from '@nestjs/common';
import { CreateServicesListDto } from './dto/create-services_list.dto';
import { UpdateServicesListDto } from './dto/update-services_list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServicesListDocument } from './services_list.schema';
@Injectable()
export class ServicesListService {
  constructor(@InjectModel('ServicesList') private readonly servicesListModel: Model<ServicesListDocument>) { }
  async create(createServicesListDto: CreateServicesListDto) {
    return await this.servicesListModel.create(createServicesListDto);
  }

  async findAll() {
    const data = await this.servicesListModel.find();
    return data
  }



  async update(id: string, updateServicesListDto: UpdateServicesListDto) {
    const data = await this.servicesListModel.findOneAndUpdate({ _id: id }, { ...updateServicesListDto }, { new: true });
    return data
  }

  async remove(id: string) {
    await this.servicesListModel.findOneAndDelete({ _id: id });
  }
}
