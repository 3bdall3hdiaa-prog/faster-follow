import { PartialType } from '@nestjs/mapped-types';
import { CreateNewOrderDto } from './create-new_order.dto';

export class UpdateNewOrderDto extends PartialType(CreateNewOrderDto) {}
