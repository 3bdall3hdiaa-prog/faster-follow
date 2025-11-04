import { Inject, Injectable } from '@nestjs/common';
import { CreateMangePaymentDto } from './dto/create-mange-payment.dto';
import { UpdateMangePaymentDto } from './dto/update-mange-payment.dto';
import { Model } from 'mongoose';
import { ManagePaymentsDocument } from './managepayments.schema';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common';
@Injectable()
export class MangePaymentsService {
  constructor(@InjectModel('MangePayment') private readonly userModel: Model<ManagePaymentsDocument>) { }
  async create(createMangePaymentDto: CreateMangePaymentDto) {
    const user = new this.userModel(createMangePaymentDto);
    return await user.save();
  }

  async findAll() {
    const data = await this.userModel.find().select('-_id -__v');
    return data
  }



  async update(id: string, updateMangePaymentDto: UpdateMangePaymentDto) {
    const check = await this.userModel.findById(id);
    if (!check) throw new HttpException("user not found", 404);
    const update = await this.userModel.findOneAndUpdate({ _id: id }, { ...updateMangePaymentDto }, { new: true });
    return update
  }

  async remove(id: string) {
    await this.userModel.findOneAndDelete({ _id: id });
  }
}
