import { Module } from '@nestjs/common';
import { ManageSettingService } from './manage-setting.service';
import { ManageSettingController } from './manage-setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SiteSettingsSchema } from './schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'ManageSetting', schema: SiteSettingsSchema }])],
  controllers: [ManageSettingController],
  providers: [ManageSettingService],
})
export class ManageSettingModule { }
