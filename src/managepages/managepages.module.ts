import { Module } from '@nestjs/common';
import { ManagepagesService } from './managepages.service';
import { ManagepagesController } from './managepages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagePagesSchema } from './managepages.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'ManagePages', schema: ManagePagesSchema }])],
  controllers: [ManagepagesController],
  providers: [ManagepagesService],
})
export class ManagepagesModule { }
