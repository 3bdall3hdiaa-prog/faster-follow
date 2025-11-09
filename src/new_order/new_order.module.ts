import { Module } from '@nestjs/common';
import { NewOrderService } from './new_order.service';
import { NewOrderController } from './new_order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './new_order.schema';
import { ConfigModule } from '@nestjs/config';
import { ManageProvidersSchema } from 'src/manage-providers/schema';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(),
  MongooseModule.forFeature([{ name: 'NewOrder', schema: UserSchema }]),
  MongooseModule.forFeature([{ name: 'ManageProviders', schema: ManageProvidersSchema }]),
  ],
  controllers: [NewOrderController],
  providers: [NewOrderService],
})
export class NewOrderModule { }
