import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ManagecoponsService } from './managecopons.service';
import { CreateManagecoponDto } from './dto/create-managecopon.dto';
import { UpdateManagecoponDto } from './dto/update-managecopon.dto';

@Controller('managecopons')
export class ManagecoponsController {
  constructor(private readonly managecoponsService: ManagecoponsService) { }

  @Post()
  create(@Body() createManagecoponDto: CreateManagecoponDto) {
    return this.managecoponsService.create(createManagecoponDto);
  }
  @Get()
  findAll() {
    return this.managecoponsService.findAll();
  }


  @Post('cheeckcoupon')
  findOne(@Body() coupon: any) {
    return this.managecoponsService.findOne(coupon);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateManagecoponDto: UpdateManagecoponDto) {
    return this.managecoponsService.update(id, updateManagecoponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managecoponsService.remove(id);
  }
}
