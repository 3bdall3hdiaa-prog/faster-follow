import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ManagepannersService } from './managepanners.service';
import { CreateManagepannerDto } from './dto/create-managepanner.dto';
import { UpdateManagepannerDto } from './dto/update-managepanner.dto';
import { role } from 'src/user/user.customdecoratoe';
import { RoleGuard } from 'src/user/guard/guard';

@Controller('managepanners')
export class ManagepannersController {
  constructor(private readonly managepannersService: ManagepannersService) { }

  @Post()
  @role(["admin"])
  @UseGuards(RoleGuard)
  create(@Body() createManagepannerDto: CreateManagepannerDto) {
    return this.managepannersService.create(createManagepannerDto);
  }

  @Get()
  findAll() {
    return this.managepannersService.findAll();
  }



  @Put(':id')
  @role(["admin"])
  @UseGuards(RoleGuard)
  update(@Param('id') id: string, @Body() updateManagepannerDto: UpdateManagepannerDto) {
    return this.managepannersService.update(id, updateManagepannerDto);
  }

  @Delete(':id')
  @role(["admin"])
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.managepannersService.remove(id);
  }
}
