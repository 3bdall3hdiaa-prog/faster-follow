import { Module } from '@nestjs/common';
import { ManageplatformsService } from './manageplatforms.service';
import { ManageplatformsController } from './manageplatforms.controller';
import { ManagePlatformsSchema } from './schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleGuard } from 'src/user/guard/guard';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';
@Module({
  imports: [JwtModule.register({ secret: process.env.secret }), MongooseModule.forFeature([{ name: 'ManagePlatforms', schema: ManagePlatformsSchema }])],
  controllers: [ManageplatformsController],
  providers: [ManageplatformsService, RoleGuard, CloudinaryService, CloudinaryProvider],
})
export class ManageplatformsModule { }
