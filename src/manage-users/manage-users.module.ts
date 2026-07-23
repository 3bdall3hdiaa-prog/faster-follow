import { Module } from '@nestjs/common';
import { ManageUsersService } from './manage-users.service';
import { ManageUsersController } from './manage-users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth_autho/auth.schema';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'auth_authos', schema: UserSchema }]), JwtModule.register({
    secret: process.env.secret,
    signOptions: { expiresIn: '24h' }
  })],
  controllers: [ManageUsersController],
  providers: [ManageUsersService],
})
export class ManageUsersModule { }
