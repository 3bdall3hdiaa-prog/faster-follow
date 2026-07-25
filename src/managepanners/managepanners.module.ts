import { Module } from '@nestjs/common';
import { ManagepannersService } from './managepanners.service';
import { ManagepannersController } from './managepanners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagePannersSchema } from './managepaners.schema';
import { RoleGuard } from 'src/user/guard/guard';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET }), MongooseModule.forFeature([{ name: 'Managepanners', schema: ManagePannersSchema }])],
  controllers: [ManagepannersController],
  providers: [ManagepannersService, RoleGuard],
})
export class ManagepannersModule { }
