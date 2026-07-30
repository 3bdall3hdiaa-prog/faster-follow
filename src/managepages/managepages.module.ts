import { Module } from '@nestjs/common';
import { ManagepagesService } from './managepages.service';
import { ManagepagesController } from './managepages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagePagesSchema } from './managepages.schema';
import { RoleGuard } from 'src/user/guard/guard';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [JwtModule.register({ secret: process.env.secret }), MongooseModule.forFeature([{ name: 'ManagePages', schema: ManagePagesSchema }])],
  controllers: [ManagepagesController],
  providers: [ManagepagesService, RoleGuard],
})
export class ManagepagesModule { }
