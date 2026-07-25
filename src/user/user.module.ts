import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../auth_autho/auth.schema';
import { RoleGuard } from './guard/guard';
@Module({
  imports: [JwtModule.register({}), MongooseModule.forFeature([{ name: 'auth_autho', schema: UserSchema }]), JwtModule.register({
    secret: process.env.secret,
    signOptions: { expiresIn: '1d' },
  })],
  controllers: [UserController],
  providers: [UserService, RoleGuard],
})
export class UserModule { }
