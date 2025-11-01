import { PartialType } from '@nestjs/mapped-types';
import { CreateManagepannerDto } from './create-managepanner.dto';

export class UpdateManagepannerDto extends PartialType(CreateManagepannerDto) {}
