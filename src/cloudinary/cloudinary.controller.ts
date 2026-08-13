import { Controller, UseInterceptors, UploadedFile, Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';


@Controller('cloudinary')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) { }
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: any) {
        return await this.cloudinaryService.uploadFile(file);
    }
}
