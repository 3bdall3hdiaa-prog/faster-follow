import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ManageUsersService } from './manage-users.service';
import { CreateManageUserDto } from './dto/create-manage-user.dto';
import { UpdateManageUserDto } from './dto/update-manage-user.dto';
import { ValidationPipe } from '@nestjs/common';
import { role } from 'src/user/user.customdecoratoe';
import { RoleGuard } from 'src/user/guard/guard';
@Controller('getallusers')
export class ManageUsersController {
  constructor(private readonly manageUsersService: ManageUsersService) { }

  @Post()
  @role(["admin"])
  @UseGuards(RoleGuard)
  create(@Body() createManageUserDto: CreateManageUserDto) {
    return this.manageUsersService.create(createManageUserDto);
  }

  @Get()
  @role(["admin"])
  @UseGuards(RoleGuard)
  getallusers() {
    return this.manageUsersService.getallusers();

  }




  @Put(':id')
  @role(["admin"])
  @UseGuards(RoleGuard)
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
