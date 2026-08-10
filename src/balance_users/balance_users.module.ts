import { Module } from '@nestjs/common';
import { BalanceUsersService } from './balance_users.service';
import { BalanceUsersController } from './balance_users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceUsersSchema } from './balanc_users.schema';
import { RoleGuard } from 'src/user/guard/guard';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [JwtModule.register({ secret: process.env.secret }), MongooseModule.forFeature([{ name: 'Payment', schema: BalanceUsersSchema }])],
  controllers: [BalanceUsersController],
  providers: [BalanceUsersService, RoleGuard],
})
export class BalanceUsersModule { }
