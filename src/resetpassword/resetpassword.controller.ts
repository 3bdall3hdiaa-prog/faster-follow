import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ResetpasswordService } from './resetpassword.service';
import { CreateResetpasswordDto } from './dto/create-resetpassword.dto';
import { ChangePassword } from './dto/create-resetpassword.dto';
import { ValidationPipe } from '@nestjs/common';
import { role } from 'src/user/user.customdecoratoe';
import { RoleGuard } from 'src/user/guard/guard';
@Controller('resetpassword')
export class ResetpasswordController {
  constructor(private readonly resetpasswordService: ResetpasswordService) { }

  @Post()
  create(@Body() createResetpasswordDto: CreateResetpasswordDto) {
    return this.resetpasswordService.create(createResetpasswordDto);
  }


  @Post('verify')
  verify(@Body() code: any) {
    return this.resetpasswordService.verifyCode(code);
  }

  @Post('change-password')
  @role(["admin", "client"])
  @UseGuards(RoleGuard)
  changePassword(@Body(new ValidationPipe()) updateResetpasswordDto: ChangePassword) {
    return this.resetpasswordService.changePassword(updateResetpasswordDto);
  }




}
