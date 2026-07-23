import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ManageSettingService } from './manage-setting.service';
import { CreateManageSettingDto } from './dto/create-manage-setting.dto';
import { UpdateManageSettingDto } from './dto/update-manage-setting.dto';
import { role } from 'src/user/user.customdecoratoe';
import { RoleGuard } from 'src/user/guard/guard';

@Controller('manage-setting')
export class ManageSettingController {
  constructor(private readonly manageSettingService: ManageSettingService) { }

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
  update(@Body() updateManageSettingDto: UpdateManageSettingDto) {
    return this.manageSettingService.update(updateManageSettingDto);
  }


}
