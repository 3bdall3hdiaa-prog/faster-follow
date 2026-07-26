import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ManagePannersDocument } from './managepaners.schema';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
@Injectable()
export class ManagepannersService {
  constructor(@InjectModel('Managepanners') private readonly userModel: Model<ManagePannersDocument>,
    @Inject('CLOUDINARY') private cloudinary: any
  ) { }
  async create(createManagepannerDto: any, file: any) {
    const check = await this.userModel.findOne({ title: createManagepannerDto.title });
    if (check) throw new HttpException('title already exist', 404);
    const createdManagepanner = new this.userModel({ ...createManagepannerDto, image: { url: file.url, public_id: file.public_id } });
    return await createdManagepanner.save();
  }
  async findAll() {
    const data = await this.userModel.find().select('-__v');
    return data
  }



  async update(id: string, updateManagepannerDto: any, file: any) {
    const check = await this.userModel.findById(id);
    if (!check) throw new HttpException("user not found", 404);
    let form = { ...updateManagepannerDto };
    if (file) {
      form = { ...updateManagepannerDto, image: { url: file.url, public_id: file.public_id } }
    }
    const update = await this.userModel.findOneAndUpdate({ _id: id }, form, { new: true });
    return update
  }

  async remove(id: string) {
    const check = await this.userModel.findById(id);
    if (!check) throw new HttpException("user not found", 404);
    if (check.image) {
      if (check.image.public_id) await this.cloudinary.uploader.destroy(check.image.public_id);
    }
    await this.userModel.findOneAndDelete({ _id: id });
    return { message: "deleted successfully", status: 200 }
  }
}
