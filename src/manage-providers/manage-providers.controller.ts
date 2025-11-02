import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ManageProvidersService } from './manage-providers.service';
import { CreateManageProviderDto } from './dto/create-manage-provider.dto';
import { UpdateManageProviderDto } from './dto/update-manage-provider.dto';
import { ValidationPipe } from '@nestjs/common';
@Controller('manage-providers')
export class ManageProvidersController {
  constructor(private readonly manageProvidersService: ManageProvidersService) { }

  @Post()
  create(@Body(new ValidationPipe()) createManageProviderDto: CreateManageProviderDto) {
    return this.manageProvidersService.create(createManageProviderDto);
  }

  @Get()
  findAll() {
    return this.manageProvidersService.findAll();
  }




  @Put(':id')
  update(@Param('id') id: string, @Body() updateManageProviderDto: UpdateManageProviderDto) {
    return this.manageProvidersService.update(id, updateManageProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manageProvidersService.remove(id);
  }
}
