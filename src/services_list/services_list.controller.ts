import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ServicesListService } from './services_list.service';
import { CreateServicesListDto } from './dto/create-services_list.dto';
import { UpdateServicesListDto } from './dto/update-services_list.dto';
import { role } from 'src/user/user.customdecoratoe';
import { RoleGuard } from 'src/user/guard/guard';

@Controller('services-list')
export class ServicesListController {
  constructor(private readonly servicesListService: ServicesListService) { }

  @Post()
  @role(['admin'])
  @UseGuards(RoleGuard)
  create(@Body() createServicesListDto: CreateServicesListDto) {
    return this.servicesListService.create(createServicesListDto);
  }

  @Get()
  findAll() {
    return this.servicesListService.findAll();
  }
  @Put(':id')
  @role(['admin'])
  @UseGuards(RoleGuard)
  update(@Param('id') id: string, @Body() updateServicesListDto: UpdateServicesListDto) {
    return this.servicesListService.update(id, updateServicesListDto);
  }
  @Delete(':id')
  @role(['admin'])
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.servicesListService.remove(id);
  }


}
