import { PartialType } from '@nestjs/mapped-types';
import { CreateMangePaymentDto } from './create-mange-payment.dto';

export class UpdateMangePaymentDto extends PartialType(CreateMangePaymentDto) {}
