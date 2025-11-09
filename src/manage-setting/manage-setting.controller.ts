import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManageSettingService } from './manage-setting.service';
import { CreateManageSettingDto } from './dto/create-manage-setting.dto';
import { UpdateManageSettingDto } from './dto/update-manage-setting.dto';

@Controller('manage-setting')
export class ManageSettingController {
  constructor(private readonly manageSettingService: ManageSettingService) { }

  @Post()
  create(@Body() createManageSettingDto: CreateManageSettingDto) {
    return this.manageSettingService.create(createManageSettingDto);
  }

  @Get()
  findAll() {
    return this.manageSettingService.findAll();
  }


  @Patch()
  update(@Body() updateManageSettingDto: UpdateManageSettingDto) {
    return this.manageSettingService.update(updateManageSettingDto);
  }


}
