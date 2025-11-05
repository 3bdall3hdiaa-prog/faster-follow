import { Module } from '@nestjs/common';
import { ManagecoponsService } from './managecopons.service';
import { ManagecoponsController } from './managecopons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CoponsSchema } from './copons.schema';
import { PaymentSchema } from '../pay-pal/pay-pal.shema';
import { NotificationSchema } from '../notification/motification.schema';
import { UserSchema } from 'src/auth_autho/auth.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Managecopon', schema: CoponsSchema }]), MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
  MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]), MongooseModule.forFeature([{ name: "auth_authos", schema: UserSchema }])],
  controllers: [ManagecoponsController],
  providers: [ManagecoponsService],
})
export class ManagecoponsModule { }
