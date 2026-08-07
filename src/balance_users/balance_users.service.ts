import { Inject, Injectable } from '@nestjs/common';
import { CreateBalanceUserDto } from './dto/create-balance_user.dto';
import { UpdateBalanceUserDto } from './dto/update-balance_user.dto';
import { Model } from 'mongoose';
import { BalanceUsersDocument } from './balanc_users.schema';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class BalanceUsersService {
  constructor(@InjectModel('Payment') private readonly userModel: Model<BalanceUsersDocument>) { }
  async create(createBalanceUserDto: CreateBalanceUserDto) {
    const createdUser = await this.userModel.create(createBalanceUserDto);
    return createdUser
  }


}
