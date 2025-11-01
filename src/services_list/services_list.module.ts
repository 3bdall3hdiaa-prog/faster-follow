import { Module } from '@nestjs/common';
import { ServicesListSchema } from './services_list.schema';
import { ServicesListController } from './services_list.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesListService } from './services_list.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'ServicesList', schema: ServicesListSchema }])],
  controllers: [ServicesListController],
  providers: [ServicesListService],
})
export class ServicesListModule { }
