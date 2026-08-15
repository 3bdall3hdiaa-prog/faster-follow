import { HttpException, Injectable } from '@nestjs/common';
import { CreateManageProviderDto } from './dto/create-manage-provider.dto';
import { UpdateManageProviderDto } from './dto/update-manage-provider.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ManageProvidersDocument } from './schema';
import axios from 'axios';
@Injectable()
export class ManageProvidersService {
  constructor(@InjectModel('ManageProviders') private readonly userModel: Model<ManageProvidersDocument>) { }
  async create(createManageProviderDto: CreateManageProviderDto) {
    const check = await this.userModel.findOne({ name: createManageProviderDto.name });
    if (check) {
      throw new HttpException('provider already exist', 403);
    }
    const createdManageProvider = await this.userModel.create(createManageProviderDto);
    if (!createdManageProvider) {
      return null;
    }
    return createdManageProvider

  }

  async findAll() {
    const data = await this.userModel.find();

    const balanceProviders = await Promise.all(
      data.map(async (provider) => {
        const res = await axios.post(provider.apiEndpoint, {
          key: provider.apiKey,
          action: 'balance',
        });

        return {
          ...provider.toObject(),
          balance: res.data.balance,
        };
      }),
    );

    return balanceProviders;
  }

  async update(id: string, updateManageProviderDto: UpdateManageProviderDto) {
    const data = await this.userModel.findOneAndUpdate({ _id: id }, { ...updateManageProviderDto }, { new: true });
    return data

  }

  async remove(id: string) {
    await this.userModel.findOneAndDelete({ _id: id });
  }


}
