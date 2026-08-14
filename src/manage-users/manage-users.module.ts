import { Module } from '@nestjs/common';
import { ManageUsersService } from './manage-users.service';
import { ManageUsersController } from './manage-users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { RoleGuard } from 'src/user/guard/guard';
@Module({
  imports: [JwtModule.register({ secret: process.env.secret }), MongooseModule.forFeature([{ name: 'auth_authos', schema: UserSchema }])],
  controllers: [ManageUsersController],
  providers: [ManageUsersService, RoleGuard],
})
export class ManageUsersModule { }
