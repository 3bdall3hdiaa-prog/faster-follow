import { Module } from '@nestjs/common';
import { ResetpasswordService } from './resetpassword.service';
import { ResetpasswordController } from './resetpassword.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ResetPasswordSchema } from './resetpassword.schema';
import { UserSchema } from 'src/auth_autho/auth.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Resetpassword', schema: ResetPasswordSchema }]), MongooseModule.forFeature([{ name: 'auth_autho', schema: UserSchema }])],
  controllers: [ResetpasswordController],
  providers: [ResetpasswordService],
})
export class ResetpasswordModule { }
