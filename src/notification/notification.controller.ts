import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }



  @Get()
  findAll() {
    return this.notificationService.findAll();
  }


  @Put(':id')
  update(@Param('id') id: string) {
    return this.notificationService.update(id);
  }

}
