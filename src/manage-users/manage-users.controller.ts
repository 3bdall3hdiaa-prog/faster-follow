import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ManageUsersService } from './manage-users.service';
import { CreateManageUserDto } from './dto/create-manage-user.dto';
import { UpdateManageUserDto } from './dto/update-manage-user.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('getallusers')
export class ManageUsersController {
  constructor(private readonly manageUsersService: ManageUsersService) { }

  @Post()
  create(@Body() createManageUserDto: CreateManageUserDto) {
    return this.manageUsersService.create(createManageUserDto);
  }

  @Get()
  getallusers() {
    return this.manageUsersService.getallusers();

  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.manageUsersService.findOne(id);
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe) updateManageUserDto: UpdateManageUserDto) {
    return this.manageUsersService.update(id, updateManageUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manageUsersService.remove(+id);
  }
}
