// src/auth/auth.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

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
        return res.redirect('http://localhost:3000/#/login?error=auth_failed');
      }

      // حفظ المستخدم في الداتابيز
      const dbUser = await this.authService.saveGoogleUser(user);

      // إنشاء التوكن
      const tokenResult = await this.authService.generateToken(dbUser);

      // التوجيه للفرونت إند
      const frontendUrl = `http://localhost:3000/#/callback?token=${tokenResult.token}&user=${encodeURIComponent(JSON.stringify(tokenResult.user))}`;
      return res.redirect(frontendUrl);

    } catch (error) {
      console.error('Callback error:', error);
      return res.redirect('http://localhost:3000/#/login?error=auth_error');
    }
  }
}