import { Controller, Post, Body, ValidationPipe, Patch, Get, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
@Controller('/signup')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post()
  async signup(@Body(new ValidationPipe()) createAuthDto: CreateAuthDto, @Res() res: any) {
    const result = await this.authService.signup(createAuthDto);
    res.cookie('token', result.token, { httpOnly: true, secure: true, sameSite: 'lax' });
    return res.status(result.status).json({
      status: result.status,
      message: result.message,
      success: true,
    });
  }
}

@Controller('/signin')
export class loginController {
  constructor(private readonly authService: AuthService) { }
  // @Throttle({ default: { limit: 5, ttl: 50000 } })
  @Post()
  async login(@Body(new ValidationPipe()) createAuthDto: CreateAuthDto, @Res() res: any, @Req() req: any) {

    const result = await this.authService.login(createAuthDto);
    console.log('========== SIGNIN ==========');
    console.log('Origin:', req.headers.origin);
    console.log('User-Agent:', req.headers['user-agent']);
    console.log('Set-Cookie will be sent');
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    console.log(result)
    return res.status(result.status).json({
      status: result.status,
      message: result.message,
      success: true,
    });
  }
}





@Controller('2FA')
export class Is2FAController {
  constructor(private readonly authService: AuthService) { }
  @Patch()
  update(@Body() createAuthDto: any) {
    return this.authService.update2fa(createAuthDto);
  }

  @Post("verify2fa")
  verify(@Body() code: any) {
    return this.authService.verify2fa(code);
  }
}

