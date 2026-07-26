import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ServicesListService } from './services_list.service';
import { role } from 'src/user/user.customdecoratoe';
import { RoleGuard } from 'src/user/guard/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('services-list')
export class ServicesListController {
  constructor(private readonly servicesListService: ServicesListService, private readonly cloudinaryService: CloudinaryService) { }

  @Post()
  @role(['admin'])
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createServicesListDto: any, @UploadedFile() file: any) {
    const getFile = await this.cloudinaryService.uploadFile(file);
    return this.servicesListService.create(createServicesListDto, getFile);
  }

  @Get()
  findAll() {
    return this.servicesListService.findAll();
  }

  @Put(':id')
  @role(['admin'])
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('file'))
  async update(@Param('id') id: string, @Body() updateServicesListDto: any, @UploadedFile() file: any) {
    let getdatafile;
    if (file) {
      getdatafile = await this.cloudinaryService.uploadFile(file);
    }
    return this.servicesListService.update(id, updateServicesListDto, getdatafile);
  }

  @Delete(':id')
  @role(['admin'])
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.servicesListService.remove(id);
  }


}
