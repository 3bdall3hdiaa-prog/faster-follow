import { PartialType } from '@nestjs/mapped-types';
import { CreateManageUserDto } from './create-manage-user.dto';

export class UpdateManageUserDto extends PartialType(CreateManageUserDto) {}
