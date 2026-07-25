import { Module } from '@nestjs/common';
import { NewOrderService } from './new_order.service';
import { NewOrderController } from './new_order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './new_order.schema';
import { ConfigModule } from '@nestjs/config';
import { ManageProvidersSchema } from 'src/manage-providers/schema';
import { RoleGuard } from 'src/user/guard/guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot(),
  MongooseModule.forFeature([{ name: 'NewOrder', schema: UserSchema }]),
  MongooseModule.forFeature([{ name: 'ManageProviders', schema: ManageProvidersSchema }]),
  JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [NewOrderController],
  providers: [NewOrderService, RoleGuard],
  exports: [NewOrderService],
})
export class NewOrderModule { }
