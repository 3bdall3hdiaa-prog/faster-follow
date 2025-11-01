import { PartialType } from '@nestjs/mapped-types';
import { CreateBalanceUserDto } from './create-balance_user.dto';

export class UpdateBalanceUserDto extends PartialType(CreateBalanceUserDto) { }
