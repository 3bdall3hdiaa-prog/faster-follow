import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServicesListDocument } from './services_list.schema';
@Injectable()
export class ServicesListService {
  constructor(@InjectModel('ServicesList') private readonly servicesListModel: Model<ServicesListDocument>, @Inject('CLOUDINARY') private cloudinary: any) { }
  async create(createServicesListDto: any, file: any) {
    const check = await this.servicesListModel.findOne({ title: createServicesListDto.title });
    if (check) throw new HttpException('title already exist', 404);
    return await this.servicesListModel.create({ ...createServicesListDto, image: { url: file.url, public_id: file.public_id } });
  }

  async findAll() {
    const data = await this.servicesListModel.find();
    return data
  }



  async update(id: string, updateServicesListDto: any, file: any) {
    const check = await this.servicesListModel.findById(id);
    if (!check) throw new HttpException("user not found", 404);
    let form = { ...updateServicesListDto };
    if (file) {
      form = { ...updateServicesListDto, image: { url: file.url, public_id: file.public_id } }
    }
    const data = await this.servicesListModel.findOneAndUpdate({ _id: id }, form, { new: true });
    return data
  }

  async remove(id: string) {
    const check = await this.servicesListModel.findById(id);
    if (!check) throw new HttpException("user not found", 404);
    if (check.image) {
      if (check.image.public_id) await this.cloudinary.uploader.destroy(check.image.public_id);
    }
    await this.servicesListModel.findOneAndDelete({ _id: id });
    return { message: "deleted successfully", status: 200 }
  }
}
