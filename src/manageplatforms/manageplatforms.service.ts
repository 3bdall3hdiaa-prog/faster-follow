import { Inject, Injectable } from '@nestjs/common';
import { CreateManageplatformDto } from './dto/create-manageplatform.dto';
import { UpdateManageplatformDto } from './dto/update-manageplatform.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ManagePlatformsDocument } from './schema';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Injectable()
export class ManageplatformsService {
  constructor(@InjectModel('ManagePlatforms') private readonly userModel: Model<ManagePlatformsDocument>,
    @Inject('CLOUDINARY') private cloudinary: any
  ) { }
  async create(createManageplatformDto: CreateManageplatformDto, file: any) {
    let data = createManageplatformDto
    if (file) {
      data = {
        ...createManageplatformDto,
        image: {
          url: file.url,
          public_id: file.public_id
        }
      }
    }
    const createdata = await this.userModel.create(data);
    return createdata
  }

  async findAll() {
    const getdata = await this.userModel.find();
    return getdata
  }



  async update(id: string, updateManageplatformDto: UpdateManageplatformDto, file: any) {
    const check = await this.userModel.findById(id);
    if (!check) throw new HttpException("user not found", 404);
    let form = { ...updateManageplatformDto };
    if (file) {
      form = { ...updateManageplatformDto, image: { url: file.url, public_id: file.public_id } }
    }
    const update = await this.userModel.findOneAndUpdate({ _id: id }, form, { new: true });
    return update
  }

  async remove(id: string) {

    const check = await this.userModel.findById({ _id: id });
    if (!check) throw new HttpException("user not found", 404);
    if (check.image) {
      if (check.image.public_id) await this.cloudinary.uploader.destroy(check.image.public_id);
    }
    await this.userModel.findOneAndDelete({ _id: id });

  }
}
