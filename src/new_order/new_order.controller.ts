import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { NewOrderService } from './new_order.service';
import { CreateNewOrderDto } from './dto/create-new_order.dto';
import { UpdateNewOrderDto } from './dto/update-new_order.dto';
import { role } from 'src/user/user.customdecoratoe';
import { RoleGuard } from 'src/user/guard/guard';

@Controller('new-order')
export class NewOrderController {
  constructor(private readonly newOrderService: NewOrderService) { }

  @Post()
  @role(["admin", "client"])
  @UseGuards(RoleGuard)
  create(@Body() createNewOrderDto: any) {
    return this.newOrderService.create(createNewOrderDto);
  }
  @Get('status/:providerOrderId')
  checkStatus(@Param('providerOrderId') providerOrderId: string) {
    return this.newOrderService.checkOrderStatus(providerOrderId);
  }


  @Get()
  @role(["admin", "client"])
  @UseGuards(RoleGuard)
  findAll() {
    return this.newOrderService.findAll();
  }

  @Get('me')
  @role(["admin", "client"])
  @UseGuards(RoleGuard)
  findOne(@Req() req: any) {
    return this.newOrderService.findOne(req.user._id);
  }

  @Patch(':id')
  @role(["admin"])
  @UseGuards(RoleGuard)
  update(@Param('id') id: string, @Body() updateNewOrderDto: UpdateNewOrderDto) {
    return this.newOrderService.update(id, updateNewOrderDto);
  }

  // @Delete(':id')
  // @role(["admin"])
  // @UseGuards(RoleGuard)
  // remove(@Param('id') id: string) {
  //   return this.newOrderService.remove(id);
  // }
}
