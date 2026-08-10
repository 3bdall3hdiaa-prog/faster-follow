import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './blog.schema';
import { RoleGuard } from 'src/user/guard/guard';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [JwtModule.register({ secret: process.env.secret }), MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }])],
  controllers: [BlogController],
  providers: [BlogService, RoleGuard],
})
export class BlogModule { }
