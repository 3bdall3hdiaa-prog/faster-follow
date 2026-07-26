import { Module } from '@nestjs/common';
import { ManageSettingService } from './manage-setting.service';
import { ManageSettingController } from './manage-setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SiteSettingsSchema } from './schema';
import { RoleGuard } from 'src/user/guard/guard';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Module({
  imports: [JwtModule.register({ secret: 'secret' }), MongooseModule.forFeature([{ name: 'ManageSetting', schema: SiteSettingsSchema }])],
  controllers: [ManageSettingController],
  providers: [ManageSettingService, RoleGuard, CloudinaryService],
})
export class ManageSettingModule { }
