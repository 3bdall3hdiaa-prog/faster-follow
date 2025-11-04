import { PartialType } from '@nestjs/mapped-types';
import { CreateResetpasswordDto } from './create-resetpassword.dto';

export class UpdateResetpasswordDto extends PartialType(CreateResetpasswordDto) {}
