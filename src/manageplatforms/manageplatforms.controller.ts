import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ManageplatformsService } from './manageplatforms.service';
import { CreateManageplatformDto } from './dto/create-manageplatform.dto';
import { UpdateManageplatformDto } from './dto/update-manageplatform.dto';
import { role } from 'src/user/user.customdecoratoe';
import { RoleGuard } from 'src/user/guard/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('manageplatforms')
export class ManageplatformsController {
  constructor(private readonly manageplatformsService: ManageplatformsService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  @Post()
  @role(["admin"])
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createManageplatformDto: CreateManageplatformDto, @UploadedFile() file: any) {
    let getdatafile;
    if (file) {
      getdatafile = await this.cloudinaryService.uploadFile(file);
    }
    return this.manageplatformsService.create(createManageplatformDto, getdatafile);
  }

  @Get()
  findAll() {
    return this.manageplatformsService.findAll();
  }


  @Put(':id')
  @role(["admin"])
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('file'))
  async update(@Param('id') id: string, @Body() updateManageplatformDto: UpdateManageplatformDto, @UploadedFile() file: any) {
    let getdatafile;
    if (file) {
      getdatafile = await this.cloudinaryService.uploadFile(file);
    }
    return this.manageplatformsService.update(id, updateManageplatformDto, getdatafile);
  }

  @Delete(':id')
  @role(["admin"])
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.manageplatformsService.remove(id);
  }
}
