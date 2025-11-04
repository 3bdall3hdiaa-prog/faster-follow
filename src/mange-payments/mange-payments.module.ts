import { Module } from '@nestjs/common';
import { MangePaymentsService } from './mange-payments.service';
import { MangePaymentsController } from './mange-payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagePaymentsSchema } from './managepayments.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'MangePayment', schema: ManagePaymentsSchema }])],
  controllers: [MangePaymentsController],
  providers: [MangePaymentsService],
})
export class MangePaymentsModule { }
