import { PartialType } from '@nestjs/mapped-types';
import { CreateManagepageDto } from './create-managepage.dto';

export class UpdateManagepageDto extends PartialType(CreateManagepageDto) {}
