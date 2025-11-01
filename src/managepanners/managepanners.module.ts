import { Module } from '@nestjs/common';
import { ManagepannersService } from './managepanners.service';
import { ManagepannersController } from './managepanners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagePannersSchema } from './managepaners.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Managepanners', schema: ManagePannersSchema }])],
  controllers: [ManagepannersController],
  providers: [ManagepannersService],
})
export class ManagepannersModule { }
