import { Controller, Post, Body, ValidationPipe, Patch, Get, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
@Controller('/signup')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post()
  signup(@Body(new ValidationPipe()) createAuthDto: CreateAuthDto) {
    return this.authService.signup(createAuthDto);
  }
}

@Controller('/signin')
export class loginController {
  constructor(private readonly authService: AuthService) { }
  @Post()
  @Throttle({ default: { limit: 5, ttl: 50000 } })
  login(@Body(new ValidationPipe()) createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
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

