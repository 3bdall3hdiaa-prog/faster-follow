import { Controller, Post, Body, ValidationPipe, Patch, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Throttle } from '@nestjs/throttler';
@Controller('/signup')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post()
  async signup(@Body(new ValidationPipe()) createAuthDto: CreateAuthDto, @Res() res: any) {
    const result = await this.authService.signup(createAuthDto);

    return res.status(result.status).json({
      status: result.status,
      message: result.message,
      success: true,
    });
  }

  @Post("/verifyOtp")
  async verify(@Body() data: any, @Res() res: any) {
    const result = await this.authService.verifyOtp(data);
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax'
    })
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
  @Post()
  @Throttle({ default: { limit: 5, ttl: 50000 } })
  async login(@Body(new ValidationPipe()) createAuthDto: CreateAuthDto, @Res() res: any) {

    const result = await this.authService.login(createAuthDto);

    res.cookie('token', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    return res.status(result.status).json({
      status: result.status,
      message: result.message,
      success: true,
    });
  }
}


