import { PartialType } from '@nestjs/mapped-types';
import { CreateManageSettingDto } from './create-manage-setting.dto';

export class UpdateManageSettingDto extends PartialType(CreateManageSettingDto) {}
