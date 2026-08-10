import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BalanceUsersService } from './balance_users.service';
import { CreateBalanceUserDto } from './dto/create-balance_user.dto';
import { UpdateBalanceUserDto } from './dto/update-balance_user.dto';
import { ValidationPipe } from '@nestjs/common';
import { role } from 'src/user/user.customdecoratoe';
import { RoleGuard } from 'src/user/guard/guard';
@Controller('balance-users')
export class BalanceUsersController {
  constructor(private readonly balanceUsersService: BalanceUsersService) { }

  @Post()
  @role(["admin", "client"])
  @UseGuards(RoleGuard)
  create(@Body(new ValidationPipe()) createBalanceUserDto: CreateBalanceUserDto) {
    return this.balanceUsersService.create(createBalanceUserDto);
  }


}
