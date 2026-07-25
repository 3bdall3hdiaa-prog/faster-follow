import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ManageplatformsService } from './manageplatforms.service';
import { CreateManageplatformDto } from './dto/create-manageplatform.dto';
import { UpdateManageplatformDto } from './dto/update-manageplatform.dto';
import { role } from 'src/user/user.customdecoratoe';
import { RoleGuard } from 'src/user/guard/guard';

@Controller('manageplatforms')
export class ManageplatformsController {
  constructor(private readonly manageplatformsService: ManageplatformsService) { }

  @Post()
  @role(["admin"])
  @UseGuards(RoleGuard)
  create(@Body() createManageplatformDto: CreateManageplatformDto) {
    return this.manageplatformsService.create(createManageplatformDto);
  }

  @Get()
  findAll() {
    return this.manageplatformsService.findAll();
  }


  @Put(':id')
  @role(["admin"])
  @UseGuards(RoleGuard)
  update(@Param('id') id: string, @Body() updateManageplatformDto: UpdateManageplatformDto) {
    return this.manageplatformsService.update(id, updateManageplatformDto);
  }

  @Delete(':id')
  @role(["admin"])
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.manageplatformsService.remove(id);
  }
}
