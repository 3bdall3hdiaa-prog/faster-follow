import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ManagepagesService } from './managepages.service';
import { CreateManagepageDto } from './dto/create-managepage.dto';
import { UpdateManagepageDto } from './dto/update-managepage.dto';

@Controller('managepages')
export class ManagepagesController {
  constructor(private readonly managepagesService: ManagepagesService) { }

  @Post()
  create(@Body() createManagepageDto: CreateManagepageDto) {
    return this.managepagesService.create(createManagepageDto);
  }

  @Get()
  findAll() {
    return this.managepagesService.findAll();
  }



  @Put(':id')
  update(@Param('id') id: string, @Body() updateManagepageDto: UpdateManagepageDto) {
    return this.managepagesService.update(id, updateManagepageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managepagesService.remove(id);
  }
}
