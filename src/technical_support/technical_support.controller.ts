import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TechnicalSupportService } from './technical_support.service';
import { CreateTechnicalSupportDto } from './dto/create-technical_support.dto';
import { UpdateTechnicalSupportDto } from './dto/update-technical_support.dto';

@Controller('technical-support')
export class TechnicalSupportController {
  constructor(private readonly technicalSupportService: TechnicalSupportService) { }

  @Post()
  create(@Body() createTechnicalSupportDto: CreateTechnicalSupportDto) {
    return this.technicalSupportService.create(createTechnicalSupportDto);
  }

  @Get()
  findAll() {
    return this.technicalSupportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technicalSupportService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTechnicalSupportDto: UpdateTechnicalSupportDto) {
    return this.technicalSupportService.update(id, updateTechnicalSupportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technicalSupportService.remove(id);
  }

  @Post(':id/reply')
  reply(@Param('id') id: string, @Body() body: { sender: string; text: string }) {
    return this.technicalSupportService.addReply(id, body);
  }



}
