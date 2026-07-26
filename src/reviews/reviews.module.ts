import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsSchema } from './reviews.schema';
import { RoleGuard } from 'src/user/guard/guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET }), MongooseModule.forFeature([{ name: 'Review', schema: ReviewsSchema }])],
  controllers: [ReviewsController],
  providers: [ReviewsService, RoleGuard],
})
export class ReviewsModule { }
