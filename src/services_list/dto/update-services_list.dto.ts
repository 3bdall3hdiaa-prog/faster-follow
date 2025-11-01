import { PartialType } from '@nestjs/mapped-types';
import { CreateServicesListDto } from './create-services_list.dto';

export class UpdateServicesListDto extends PartialType(CreateServicesListDto) {}
