import { Module } from '@nestjs/common';
import { PaypalService } from './pay-pal.service';
import { PaypalController } from './pay-pal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './pay-pal.shema';
import { NotificationSchema } from 'src/notification/motification.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }])],
  controllers: [PaypalController],
  providers: [PaypalService],
})
export class PayPalModule { }
