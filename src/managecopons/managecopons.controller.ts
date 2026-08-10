import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ManagecoponsService } from './managecopons.service';
import { CreateManagecoponDto } from './dto/create-managecopon.dto';
import { UpdateManagecoponDto } from './dto/update-managecopon.dto';
import { RoleGuard } from 'src/user/guard/guard';
import { role } from 'src/user/user.customdecoratoe';

@Controller('managecopons')
export class ManagecoponsController {
  constructor(private readonly managecoponsService: ManagecoponsService) { }

  @Post()
  @role(['admin'])
  @UseGuards(RoleGuard)
  create(@Body() createManagecoponDto: { code: string, amount: number, used: boolean }) {
    return this.managecoponsService.create(createManagecoponDto);
  }

  @Post('editbalance')
  @role(["admin"])
  @UseGuards(RoleGuard)
  createe(@Body() createManagecoponDto: any) {
    return this.managecoponsService.createe(createManagecoponDto);
  }
  @Get()
  @role(["admin"])
  @UseGuards(RoleGuard)
  findAll() {
    return this.managecoponsService.findAll();
  }


  @Post('cheeckcoupon')
  @role(["admin", "client"])
  @UseGuards(RoleGuard)
  findOne(@Body() coupon: any) {
    return this.managecoponsService.findOne(coupon);
  }

  @Put(':id')
  @role(['admin'])
  @UseGuards(RoleGuard)
  update(@Param('id') id: string, @Body() updateManagecoponDto: UpdateManagecoponDto) {
    return this.managecoponsService.update(id, updateManagecoponDto);
  }

  @Delete(':id')
  @role(['admin'])
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.managecoponsService.remove(id);
  }
}
