import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServicesListDocument } from './services_list.schema';
import axios from 'axios';
@Injectable()
export class ServicesListService {
  constructor(@InjectModel('ServicesList') private readonly servicesListModel: Model<ServicesListDocument>, @Inject('CLOUDINARY') private cloudinary: any) { }
  async create(createServicesListDto: any, file: any) {
    // const check = await this.servicesListModel.findOne({ title: createServicesListDto.title });
    // if (check) throw new HttpException('title already exist', 404);
    if (!createServicesListDto.provider || !createServicesListDto.services) throw new HttpException('provider is required', 404);
    const { provider, services } = createServicesListDto;
    const addService = Promise.all(services.map(async (el: any) => {
      await this.servicesListModel.create({
        provider,
        providerServiceId: el.service,
        title: el.name,
        price: Number(el.rate) * 1.2,
        providerRate: el.rate,
        min: el.min,
        max: el.max,
        platform: el.category,
      });
    }))
    await addService


    return { message: "added successfully", status: 200 }
  }

  async findAll() {
    const data = await this.servicesListModel.find().populate('provider', 'name');
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
  async getdata(query: { key: string, apiEndpoint: string, page: number }) {
    const data = await axios.post(query.apiEndpoint, {
      key: `${query.key}`,
      action: "services"
    });
    let limit = 50;
    let p = query.page - 1;
    let skip = p * limit;
    const length = Math.ceil(data.data.length / limit);
    const result = data.data.slice(skip, (p + 1) * limit);
    return {
      data: result,
      length: length
    }
  }
}
