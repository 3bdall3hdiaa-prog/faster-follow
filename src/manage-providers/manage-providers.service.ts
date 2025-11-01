import { Injectable } from '@nestjs/common';
import { CreateManageProviderDto } from './dto/create-manage-provider.dto';
import { UpdateManageProviderDto } from './dto/update-manage-provider.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ManageProvidersDocument } from './schema';
@Injectable()
export class ManageProvidersService {
  constructor(@InjectModel('ManageProviders') private readonly userModel: Model<ManageProvidersDocument>) { }
  async create(createManageProviderDto: CreateManageProviderDto) {
    const createdManageProvider = await this.userModel.create(createManageProviderDto);
    if (!createdManageProvider) {
      return null;
    }
    return createdManageProvider

  }

  async findAll() {
    const data = await this.userModel.find();
    return data
  }

  findOne(id: number) {
    return `This action returns a #${id} manageProvider`;
  }

  async update(id: string, updateManageProviderDto: UpdateManageProviderDto) {
    const data = await this.userModel.findOneAndUpdate({ _id: id }, { ...updateManageProviderDto }, { new: true });
    return data

  }

  async remove(id: string) {
    await this.userModel.findOneAndDelete({ _id: id });
  }
}
