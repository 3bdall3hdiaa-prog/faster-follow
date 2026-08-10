import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
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
  create(@Body() createResetpasswordDto: { email: string }) {
    return this.resetpasswordService.create(createResetpasswordDto);
  }


  @Post('verify')
  async verify(@Body() code: any, @Res() res: any) {
    const result = await this.resetpasswordService.verifyCode(code);
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
    })
    return {
      message: result.message,
      token: result.token
    }
  }

  @Post('change-password')
  @role(["admin", "client"])
  @UseGuards(RoleGuard)
  changePassword(@Body(new ValidationPipe()) updateResetpasswordDto: ChangePassword) {
    return this.resetpasswordService.changePassword(updateResetpasswordDto);
  }




}
