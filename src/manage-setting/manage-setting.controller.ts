import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ManageSettingService } from './manage-setting.service';
import { CreateManageSettingDto } from './dto/create-manage-setting.dto';
import { UpdateManageSettingDto } from './dto/update-manage-setting.dto';
import { role } from 'src/user/user.customdecoratoe';
import { RoleGuard } from 'src/user/guard/guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('manage-setting')
export class ManageSettingController {
  constructor(private readonly manageSettingService: ManageSettingService,
    private readonly CloudinaryService: CloudinaryService
  ) { }

  @Post()
  @role(["admin"])
  @UseGuards(RoleGuard)
  create(@Body() createManageSettingDto: CreateManageSettingDto) {
    return this.manageSettingService.create(createManageSettingDto);
  }

  @Get()
  findAll() {
    return this.manageSettingService.findAll();
  }


  @Patch()
  @role(["admin"])
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('file'))
  async update(@Body() updateManageSettingDto: any, @UploadedFile() file: any) {
    let getdatafile;
    if (file) {
      getdatafile = await this.CloudinaryService.uploadFile(file);
    }
    return this.manageSettingService.update(updateManageSettingDto, getdatafile);
  }


}
