import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ServicesListService } from './services_list.service';
import { role } from 'src/user/user.customdecoratoe';
import { RoleGuard } from 'src/user/guard/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateServicesListDto } from './dto/create-services_list.dto';

@Controller('services-list')
export class ServicesListController {
  constructor(private readonly servicesListService: ServicesListService, private readonly cloudinaryService: CloudinaryService) { }


  @Post()
  @role(['admin'])
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createServicesListDto: any, @UploadedFile() file: any) {
    let getFile
    if (file) getFile = await this.cloudinaryService.uploadFile(file);
    return this.servicesListService.create(createServicesListDto, getFile);
  }
  @Get('/search')
  getSearch(@Query() query: { search: string }) {
    return this.servicesListService.getSearch(query)
  }


  @Get()
  findAll() {
    return this.servicesListService.findAll();
  }

  @Put(':id')
  @role(['admin'])
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('file'))
  async update(@Param('id') id: string, @Body() updateServicesListDto: any, @UploadedFile() file: any) {
    let getdatafile;
    if (file) {
      getdatafile = await this.cloudinaryService.uploadFile(file);
    }
    return this.servicesListService.update(id, updateServicesListDto, getdatafile);
  }

  @Delete(':id')
  @role(['admin'])
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.servicesListService.remove(id);
  }

  @Get('getdata')
  async getdata(@Query() query: { key: string, apiEndpoint: string, page: number, search: string }) {
    return this.servicesListService.getdata(query);
  }
  @Get('/getOne/:slug')
  async getOne(@Param() data: any, @Query() query: { platform: string }) {
    return this.servicesListService.getOne(data, query.platform)
  }
  @Get('/:id')
  async getService(@Param('id') id: string) {
    return this.servicesListService.getService(id)
  }

  @Post('refill')
  @role(['admin', 'client'])
  @UseGuards(RoleGuard)
  refill(@Body() data: { order: string, key: string, apiEndpoint: string }) {
    return this.servicesListService.refill(data)
  }

  @Post('refillStatus')
  @role(['admin', 'client'])
  @UseGuards(RoleGuard)
  refillStatus(@Body() data: { refillId: string, key: string, apiEndpoint: string }) {
    return this.servicesListService.refillStatus(data)
  }







  // @Post('total-price')
  // async getTotalPrice(@Body() data: { serviceId: string, quantity: number }) {
  //   return this.servicesListService.getTotalPrice(data)
  // }

}
