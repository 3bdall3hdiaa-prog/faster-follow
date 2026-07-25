import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ManagepagesService } from './managepages.service';
import { CreateManagepageDto } from './dto/create-managepage.dto';
import { UpdateManagepageDto } from './dto/update-managepage.dto';
import { role } from 'src/user/user.customdecoratoe';
import { RoleGuard } from 'src/user/guard/guard';

@Controller('managepages')
export class ManagepagesController {
  constructor(private readonly managepagesService: ManagepagesService) { }

  @Post()
  @role(["admin"])
  @UseGuards(RoleGuard)
  create(@Body() createManagepageDto: CreateManagepageDto) {
    return this.managepagesService.create(createManagepageDto);
  }

  @Get()
  findAll() {
    return this.managepagesService.findAll();
  }



  @Put(':id')
  @role(["admin"])
  @UseGuards(RoleGuard)
  update(@Param('id') id: string, @Body() updateManagepageDto: UpdateManagepageDto) {
    return this.managepagesService.update(id, updateManagepageDto);
  }

  @Delete(':id')
  @role(["admin"])
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.managepagesService.remove(id);
  }
}
