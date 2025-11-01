import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewOrderService } from './new_order.service';
import { CreateNewOrderDto } from './dto/create-new_order.dto';
import { UpdateNewOrderDto } from './dto/update-new_order.dto';

@Controller('new-order')
export class NewOrderController {
  constructor(private readonly newOrderService: NewOrderService) { }

  @Post()
  create(@Body() createNewOrderDto: any) {
    return this.newOrderService.create(createNewOrderDto);
  }
  @Get('status/:providerOrderId')
  checkStatus(@Param('providerOrderId') providerOrderId: string) {
    return this.newOrderService.checkOrderStatus(providerOrderId);
  }


  @Get()
  findAll() {
    return this.newOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewOrderDto: UpdateNewOrderDto) {
    return this.newOrderService.update(id, updateNewOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newOrderService.remove(id);
  }
}
