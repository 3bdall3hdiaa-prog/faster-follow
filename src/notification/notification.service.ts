import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationDocument } from './motification.schema';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
@Injectable()
export class NotificationService {
  constructor(@InjectModel('Notification') private readonly userModel: Model<NotificationDocument>) { }


  async findAll() {
    const data = await this.userModel.find();
    return data

  }


  async update(id: string) {
    const data = await this.userModel.findById(id);
    if (!data) throw new HttpException("user not found", 404);
    const update = await this.userModel.findOneAndUpdate({ _id: id }, { $set: { isRead: true } }, { new: true });
    return update
  }


}
