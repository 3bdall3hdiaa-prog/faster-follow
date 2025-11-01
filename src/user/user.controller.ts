import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { RoleGuard } from './guard/guard'
import { role } from './user.customdecoratoe'
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }



  @Patch('/update')
  @role(["client", "admin"])
  @UseGuards(RoleGuard)
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req, updateUserDto);
  }
  @Patch('/updatepassword')
  @role(["client", "admin"])
  @UseGuards(RoleGuard)
  updatepassword(@Req() req: any, @Body() updatepasss: UpdateUserDto) {
    return this.userService.updatepassword(req, updatepasss);
  }


}