import { Module } from '@nestjs/common';
import { ManageProvidersService } from './manage-providers.service';
import { ManageProvidersController } from './manage-providers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ManageProvidersSchema } from './schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'ManageProviders', schema: ManageProvidersSchema }])],
  controllers: [ManageProvidersController],
  providers: [ManageProvidersService],
})
export class ManageProvidersModule { }
