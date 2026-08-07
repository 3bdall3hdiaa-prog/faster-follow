import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BalanceUsersService } from './balance_users.service';
import { CreateBalanceUserDto } from './dto/create-balance_user.dto';
import { UpdateBalanceUserDto } from './dto/update-balance_user.dto';
import { ValidationPipe } from '@nestjs/common';
@Controller('balance-users')
export class BalanceUsersController {
  constructor(private readonly balanceUsersService: BalanceUsersService) { }

  @Post()
  create(@Body(new ValidationPipe()) createBalanceUserDto: CreateBalanceUserDto) {
    return this.balanceUsersService.create(createBalanceUserDto);
  }


}
