import { PartialType } from '@nestjs/mapped-types';
import { CreateManageplatformDto } from './create-manageplatform.dto';

export class UpdateManageplatformDto extends PartialType(CreateManageplatformDto) {}
