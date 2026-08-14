import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { ResetpasswordService } from './resetpassword.service';
import { role } from 'src/user/user.customdecoratoe';
import { RoleGuard } from 'src/user/guard/guard';
@Controller('resetpassword')
export class ResetpasswordController {
  constructor(private readonly resetpasswordService: ResetpasswordService) { }

  @Post()
  create(@Body() createResetpasswordDto: { email: string }) {
    return this.resetpasswordService.create(createResetpasswordDto);
  }



  @Post('change-password')
  @role(["admin", "client"])
  @UseGuards(RoleGuard)
  changePassword(@Body() updateResetpasswordDto: any) {
    return this.resetpasswordService.changePassword(updateResetpasswordDto);
  }




}
