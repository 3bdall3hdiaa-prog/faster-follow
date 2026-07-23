import { Module } from '@nestjs/common';
import { ManageProvidersService } from './manage-providers.service';
import { ManageProvidersController } from './manage-providers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ManageProvidersSchema } from './schema';
import { JwtModule } from '@nestjs/jwt';
import { RoleGuard } from 'src/user/guard/guard';
@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET }), MongooseModule.forFeature([{ name: 'ManageProviders', schema: ManageProvidersSchema }])],
  controllers: [ManageProvidersController],
  providers: [ManageProvidersService, RoleGuard],
})
export class ManageProvidersModule { }
