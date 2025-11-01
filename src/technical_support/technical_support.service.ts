import { Inject, Injectable } from '@nestjs/common';
import { CreateTechnicalSupportDto } from './dto/create-technical_support.dto';
import { UpdateTechnicalSupportDto } from './dto/update-technical_support.dto';
import { Model } from 'mongoose';
import { TechnicalSupportDocument } from './techniacal_support.schema';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common';
@Injectable()
export class TechnicalSupportService {
  constructor(@InjectModel('TechnicalSupport') private readonly userModel: Model<TechnicalSupportDocument>) { }
  async create(createTechnicalSupportDto: CreateTechnicalSupportDto) {
    const createdUser = new this.userModel(createTechnicalSupportDto);
    return await createdUser.save();
  }

  async findAll() {
    const data = await this.userModel.find();
    return data
  }

  findOne(id: string) {


  }

  async update(id: string, updateTechnicalSupportDto: UpdateTechnicalSupportDto) {
    const data = await this.userModel.findById(id);
    if (!data) throw new HttpException("user not found", 404);
    const update = await this.userModel.findOneAndUpdate({ _id: id }, { ...updateTechnicalSupportDto }, { new: true });
    return update
  }

  async remove(id: string) {
    await this.userModel.findOneAndDelete({ _id: id });
  }
  async addReply(id: string, reply: { sender: string; text: string }) {
    const ticket = await this.userModel.findById(id);
    if (!ticket) throw new HttpException('Ticket not found', 404);

    const newMessage = {
      sender: reply.sender,
      text: reply.text,
      createdAt: new Date(),
    };

    ticket.messages.push(newMessage);
    ticket.status = 'Answered';
    await ticket.save();

    return ticket;
  }


}
