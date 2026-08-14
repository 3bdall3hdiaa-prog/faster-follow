import { Module } from '@nestjs/common';
import { ResetpasswordService } from './resetpassword.service';
import { ResetpasswordController } from './resetpassword.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ResetPasswordSchema } from './resetpassword.schema';
import { UserSchema } from 'src/auth/auth.schema';
import { RoleGuard } from 'src/user/guard/guard';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [JwtModule.register({ secret: process.env.secret }), MongooseModule.forFeature([{ name: 'auth_authos', schema: UserSchema }]),],
  controllers: [ResetpasswordController],
  providers: [ResetpasswordService, RoleGuard],
})
export class ResetpasswordModule { }
