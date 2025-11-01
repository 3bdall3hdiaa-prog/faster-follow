import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogDocument } from './blog.schema';
import { HttpException } from '@nestjs/common';
@Injectable()
export class BlogService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<BlogDocument>) { }
  async create(createBlogDto: CreateBlogDto) {
    const data = await this.blogModel.create(createBlogDto);
    return data
  }

  async findAll() {
    const data = await this.blogModel.find();
    return data
  }



  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const check = await this.blogModel.findById(id);
    if (!check) throw new HttpException("user not found", 404);
    const update = await this.blogModel.findOneAndUpdate({ _id: id }, { ...updateBlogDto }, { new: true });
    return update
  }

  async remove(id: string) {
    await this.blogModel.findOneAndDelete({ _id: id });
  }
}
