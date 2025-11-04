import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MangePaymentsService } from './mange-payments.service';
import { CreateMangePaymentDto } from './dto/create-mange-payment.dto';
import { UpdateMangePaymentDto } from './dto/update-mange-payment.dto';

@Controller('mange-payments')
export class MangePaymentsController {
  constructor(private readonly mangePaymentsService: MangePaymentsService) { }

  @Post()
  create(@Body() createMangePaymentDto: CreateMangePaymentDto) {
    return this.mangePaymentsService.create(createMangePaymentDto);
  }

  @Get()
  findAll() {
    return this.mangePaymentsService.findAll();
  }



  @Put(':id')
  update(@Param('id') id: string, @Body() updateMangePaymentDto: UpdateMangePaymentDto) {
    return this.mangePaymentsService.update(id, updateMangePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mangePaymentsService.remove(id);
  }
}
