import { Module } from '@nestjs/common';
import { NewOrderService } from './new_order.service';
import { NewOrderController } from './new_order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './new_order.schema';
import { ConfigModule } from '@nestjs/config';
import { ManageProvidersSchema } from 'src/manage-providers/schema';
import { RoleGuard } from 'src/user/guard/guard';
import { JwtModule } from '@nestjs/jwt';
import { ServicesListSchema } from 'src/services_list/services_list.schema';

@Module({
  imports: [ConfigModule.forRoot(),
  MongooseModule.forFeature([{ name: 'NewOrder', schema: UserSchema }]),
  MongooseModule.forFeature([{ name: 'ManageProviders', schema: ManageProvidersSchema }]),
  MongooseModule.forFeature([{ name: 'ServicesList', schema: ServicesListSchema }]),
  JwtModule.register({ secret: process.env.secret }),
  ],
  controllers: [NewOrderController],
  providers: [NewOrderService, RoleGuard],
  exports: [NewOrderService],
})
export class NewOrderModule { }
