import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ManageplatformsService } from './manageplatforms.service';
import { CreateManageplatformDto } from './dto/create-manageplatform.dto';
import { UpdateManageplatformDto } from './dto/update-manageplatform.dto';

@Controller('manageplatforms')
export class ManageplatformsController {
  constructor(private readonly manageplatformsService: ManageplatformsService) { }

  @Post()
  create(@Body() createManageplatformDto: CreateManageplatformDto) {
    return this.manageplatformsService.create(createManageplatformDto);
  }

  @Get()
  findAll() {
    return this.manageplatformsService.findAll();
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateManageplatformDto: UpdateManageplatformDto) {
    return this.manageplatformsService.update(id, updateManageplatformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manageplatformsService.remove(id);
  }
}
