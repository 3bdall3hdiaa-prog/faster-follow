import { HttpException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reviews } from './reviews.schema';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel('Review') private readonly reviewModel: Model<Reviews>,) { }
  async create(createReviewDto: CreateReviewDto) {
    const review = await this.reviewModel.create(createReviewDto);
    return review
  }

  async findAll() {
    const data = await this.reviewModel.find().populate('userId', ['username', 'email']).populate('serviceId', 'title');
    return data
  }

  findOne(id: string) {
    if (!id) throw new HttpException("service not found", 404);
    const data = this.reviewModel.find({ serviceId: id }).populate('userId', 'username').populate('serviceId', 'title');
    return data
  }

  // update(id: number, updateReviewDto: UpdateReviewDto) {
  //   return `This action updates a #${id} review`;
  // }

  async remove(id: string) {
    const check = await this.reviewModel.findById(id);
    if (!check) throw new HttpException("comment not found", 404);
    await this.reviewModel.findOneAndDelete({ _id: id });
    return { message: "deleted successfully", status: 200 }
  }
}
