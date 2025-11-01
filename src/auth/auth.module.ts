import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from '../strategy/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './auth.schema';
@Module({
  imports: [JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1h' },
  }), HttpModule, MongooseModule.forFeature([{ name: "auth_authos", schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule { }
