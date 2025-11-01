import { PartialType } from '@nestjs/mapped-types';
import { CreateManageProviderDto } from './create-manage-provider.dto';

export class UpdateManageProviderDto extends PartialType(CreateManageProviderDto) {}
