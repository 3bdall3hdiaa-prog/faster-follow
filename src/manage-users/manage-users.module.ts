import { Module } from '@nestjs/common';
import { ManageUsersService } from './manage-users.service';
import { ManageUsersController } from './manage-users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth_autho/auth.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'auth_authos', schema: UserSchema }])],
  controllers: [ManageUsersController],
  providers: [ManageUsersService],
})
export class ManageUsersModule { }
