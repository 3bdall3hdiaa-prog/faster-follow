import { Injectable } from '@nestjs/common';
import { CreateBalanceUserDto } from './dto/create-balance_user.dto';
import { Model } from 'mongoose';
import { BalanceUsersDocument } from './balanc_users.schema';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class BalanceUsersService {
  constructor(@InjectModel('Payment') private readonly userModel: Model<BalanceUsersDocument>) { }
  async create(createBalanceUserDto: CreateBalanceUserDto) {
    if (!createBalanceUserDto.amount && !createBalanceUserDto.userName) throw new Error('Amount and userName is required');
    if (createBalanceUserDto.amount > 0) throw new Error('Amount must be negative');
    const createdUser = await this.userModel.create(createBalanceUserDto);
    return createdUser
  }


}
