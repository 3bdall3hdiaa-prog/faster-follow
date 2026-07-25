import { Module } from '@nestjs/common';
import { ManageplatformsService } from './manageplatforms.service';
import { ManageplatformsController } from './manageplatforms.controller';
import { ManagePlatformsSchema } from './schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleGuard } from 'src/user/guard/guard';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET }), MongooseModule.forFeature([{ name: 'ManagePlatforms', schema: ManagePlatformsSchema }])],
  controllers: [ManageplatformsController],
  providers: [ManageplatformsService, RoleGuard],
})
export class ManageplatformsModule { }
