import { Module } from '@nestjs/common';
import { BalanceUsersService } from './balance_users.service';
import { BalanceUsersController } from './balance_users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceUsersSchema } from './balanc_users.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Payment', schema: BalanceUsersSchema }])],
  controllers: [BalanceUsersController],
  providers: [BalanceUsersService],
})
export class BalanceUsersModule { }
