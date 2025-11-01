import { Module } from '@nestjs/common';
import { ManagecoponsService } from './managecopons.service';
import { ManagecoponsController } from './managecopons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CoponsSchema } from './copons.schema';
import { PaymentSchema } from '../pay-pal/pay-pal.shema';
import { NotificationSchema } from '../notification/motification.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Managecopon', schema: CoponsSchema }]), MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
  MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),],
  controllers: [ManagecoponsController],
  providers: [ManagecoponsService],
})
export class ManagecoponsModule { }
