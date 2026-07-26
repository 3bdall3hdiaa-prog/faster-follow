import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ManagepannersService } from './managepanners.service';
import { role } from 'src/user/user.customdecoratoe';
import { RoleGuard } from 'src/user/guard/guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('managepanners')
export class ManagepannersController {
  constructor(private readonly managepannersService: ManagepannersService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  @Post()
  @role(["admin"])
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createManagepannerDto: any, @UploadedFile() file: any) {
    let getdatafile;
    if (file) {
      getdatafile = await this.cloudinaryService.uploadFile(file);
    }
    return this.managepannersService.create(createManagepannerDto, getdatafile);
  }

  @Get()
  findAll() {
    return this.managepannersService.findAll();
  }



  @Put(':id')
  @role(["admin"])
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('file'))
  async update(@Param('id') id: string, @Body() updateManagepannerDto: any, @UploadedFile() file: any) {
    let getdatafile;
    if (file) {
      getdatafile = await this.cloudinaryService.uploadFile(file);
    }
    return this.managepannersService.update(id, updateManagepannerDto, getdatafile);
  }

  @Delete(':id')
  @role(["admin"])
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.managepannersService.remove(id);
  }
}
