import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserSchema } from '../auth/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { loginController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt';

@Module({

  imports: [MongooseModule.forFeature([{ name: 'auth_authos', schema: UserSchema }]), JwtModule.register({
    secret: process.env.secret,
  }),

  ],
  controllers: [AuthController, loginController],
  providers: [AuthService],
})
export class AUTHAUTHOModule { }
