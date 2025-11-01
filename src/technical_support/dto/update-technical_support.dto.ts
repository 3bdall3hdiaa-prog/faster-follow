import { PartialType } from '@nestjs/mapped-types';
import { CreateTechnicalSupportDto } from './create-technical_support.dto';

export class UpdateTechnicalSupportDto extends PartialType(CreateTechnicalSupportDto) {}
