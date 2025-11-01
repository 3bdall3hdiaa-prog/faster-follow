import { PartialType } from '@nestjs/mapped-types';
import { CreateManagecoponDto } from './create-managecopon.dto';

export class UpdateManagecoponDto extends PartialType(CreateManagecoponDto) {}
