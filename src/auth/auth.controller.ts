// src/auth/auth.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/user/guard/guard';
import { role } from 'src/user/user.customdecoratoe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get("/login")
  @UseGuards(AuthGuard('google'))
  login() {
    return "Redirecting to Google...";
  }

  @Get("/google/callback")
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req: any, @Res() res: any) {
    try {
      const user = req.user;

      if (!user) {
        return res.redirect(`${process.env.API_FRONT}/#/login?error=auth_failed`);
      }

      const dbUser = await this.authService.saveGoogleUser(user);

      const tokenResult = await this.authService.generateToken(dbUser);

      res.cookie('token', tokenResult.token, {
        httpOnly: true, secure: true, sameSite: 'lax'
      });
      const frontendUrl = `${process.env.API_FRONT}/#/callback`;
      return res.redirect(frontendUrl);

    } catch (error) {
      console.error('Callback error:', error);
      return res.redirect(`${process.env.API_FRONT}/#/login?error=auth_error`);
    }
  }

  @Get('/me')
  @role(['admin', 'client'])
  @UseGuards(RoleGuard)
  async me(@Req() req: any) {
    const user: { _id: string, username: string, role: string } = req.user;
    return user
  }

  @Get('/logout')
  async logout(@Res() res: any) {
    res.clearCookie('token', {
      httpOnly: true, secure: true, sameSite: 'lax'
    });
    return res.status(200).json({
      message: 'Logout successful',
      success: true,
    });
  }


}