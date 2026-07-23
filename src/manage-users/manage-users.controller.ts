import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ManageUsersService } from './manage-users.service';
import { CreateManageUserDto } from './dto/create-manage-user.dto';
import { UpdateManageUserDto } from './dto/update-manage-user.dto';
import { ValidationPipe } from '@nestjs/common';
import Roles from 'src/decorator/decorator'
import { AuthGuard } from './guard/authguard'
@Controller('getallusers')
export class ManageUsersController {
  constructor(private readonly manageUsersService: ManageUsersService) { }

  @Post()
  @Roles(["admin"])
  @UseGuards(AuthGuard)
  create(@Body() createManageUserDto: CreateManageUserDto) {
    return this.manageUsersService.create(createManageUserDto);
  }

  @Get()
  getallusers() {
    return this.manageUsersService.getallusers();

  }




  @Put(':id')
  @Roles(["admin"])
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body(new ValidationPipe) updateManageUserDto: UpdateManageUserDto) {
    return this.manageUsersService.update(id, updateManageUserDto);
  }

  // @Delete(':id')
  // @Roles(["admin"])
  // @UseGuards(AuthGuard)
  // remove(@Param('id') id: string) {
  //   return this.manageUsersService.remove(+id);
  // }
}
