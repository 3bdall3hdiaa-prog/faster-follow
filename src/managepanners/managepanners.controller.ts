import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ManagepannersService } from './managepanners.service';
import { CreateManagepannerDto } from './dto/create-managepanner.dto';
import { UpdateManagepannerDto } from './dto/update-managepanner.dto';

@Controller('managepanners')
export class ManagepannersController {
  constructor(private readonly managepannersService: ManagepannersService) { }

  @Post()
  create(@Body() createManagepannerDto: CreateManagepannerDto) {
    return this.managepannersService.create(createManagepannerDto);
  }

  @Get()
  findAll() {
    return this.managepannersService.findAll();
  }



  @Put(':id')
  update(@Param('id') id: string, @Body() updateManagepannerDto: UpdateManagepannerDto) {
    return this.managepannersService.update(id, updateManagepannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managepannersService.remove(id);
  }
}
