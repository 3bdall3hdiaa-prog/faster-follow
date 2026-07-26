import { Controller, UseInterceptors, UploadedFile, Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';


@Controller('cloudinary')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) { }
    @Post('upload')
    /*
  FileInterceptor('file')
  =>  عشان يستقبل الفايل اللي جاي من الـ request
  بيستخدم multer
  هيخزن محتوى الفايل في الرام داخل Buffer
   لو التخزين MemoryStorage
  ولو DiskStorage
   هيحفظه على الهارد
  
  'file'
  => لازم اسم الـ 
  field 
  اللي جاي من 
  form-data 
  يكون اسمه file
  
  @UploadedFile()
  => بياخد الفايل اللي جه من 
  FileInterceptor 
  ويحطه في المتغير file
  
  ترتيب التنفيذ:
  request -> FileInterceptor -> @UploadedFile() -> controller -> service
  */

    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: any) {
        return await this.cloudinaryService.uploadFile(file);
    }
}
