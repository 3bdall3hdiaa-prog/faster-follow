import { Module } from '@nestjs/common';
import { TechnicalSupportService } from './technical_support.service';
import { TechnicalSupportController } from './technical_support.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TechnicalSupportSchema } from './techniacal_support.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'TechnicalSupport', schema: TechnicalSupportSchema }])],
  controllers: [TechnicalSupportController],
  providers: [TechnicalSupportService],
})
export class TechnicalSupportModule { }
