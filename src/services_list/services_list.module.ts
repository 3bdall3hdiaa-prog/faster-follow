import { Module } from '@nestjs/common';
import { ServicesListSchema } from './services_list.schema';
import { ServicesListController } from './services_list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesListService } from './services_list.service';
import { RoleGuard } from 'src/user/guard/guard';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';
import { ManageProvidersSchema } from 'src/manage-providers/schema';
import { ManagePlatformsSchema } from 'src/manageplatforms/schema';
import { Counter, CounterSchema } from './counter.schema';
@Module({
  imports: [JwtModule.register({ secret: process.env.secret }), MongooseModule.forFeature([{ name: 'ServicesList', schema: ServicesListSchema }]), MongooseModule.forFeature([{ name: 'ManageProviders', schema: ManageProvidersSchema }, {
    name: Counter.name,
    schema: CounterSchema
  }]),
  MongooseModule.forFeature([{ name: 'ManagePlatforms', schema: ManagePlatformsSchema }])],
  controllers: [ServicesListController],
  providers: [ServicesListService, RoleGuard, CloudinaryService, CloudinaryProvider],
})
export class ServicesListModule { }
