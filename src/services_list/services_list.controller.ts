import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ServicesListService } from './services_list.service';
import { CreateServicesListDto } from './dto/create-services_list.dto';
import { UpdateServicesListDto } from './dto/update-services_list.dto';

@Controller('services-list')
export class ServicesListController {
  constructor(private readonly servicesListService: ServicesListService) { }

  @Post()
  create(@Body() createServicesListDto: CreateServicesListDto) {
    return this.servicesListService.create(createServicesListDto);
  }

  @Get()
  findAll() {
    return this.servicesListService.findAll();
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateServicesListDto: UpdateServicesListDto) {
    return this.servicesListService.update(id, updateServicesListDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesListService.remove(id);
  }


}
