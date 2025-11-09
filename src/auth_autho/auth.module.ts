import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserSchema } from './auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { loginController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt';
import { Is2FAController } from './auth.controller'
import { ResetPasswordSchema } from 'src/resetpassword/resetpassword.schema';
@Module({
  // انا قايله في نفس الكوليكشن بتاع اليوزر لان اللي اتنين تبع بعض
  imports: [MongooseModule.forFeature([{ name: 'auth_autho', schema: UserSchema }]), MongooseModule.forFeature([{ name: 'Resetpassword', schema: ResetPasswordSchema }]), JwtModule.register({
    secret: process.env.secret,
    signOptions: { expiresIn: '24h' }
  })],
  controllers: [AuthController, loginController, Is2FAController],
  providers: [AuthService],
})
export class AUTHAUTHOModule { }
