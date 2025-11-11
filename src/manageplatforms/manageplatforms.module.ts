import { Module } from '@nestjs/common';
import { ManageplatformsService } from './manageplatforms.service';
import { ManageplatformsController } from './manageplatforms.controller';
import { ManagePlatformsSchema } from './schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'ManagePlatforms', schema: ManagePlatformsSchema }])],
  controllers: [ManageplatformsController],
  providers: [ManageplatformsService],
})
export class ManageplatformsModule { }
