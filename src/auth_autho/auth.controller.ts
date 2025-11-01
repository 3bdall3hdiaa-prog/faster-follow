import { Controller, Post, Body, ValidationPipe, Patch, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
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
  login(@Body(new ValidationPipe()) createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }
}
// @Controller('profile')
// export class profileController {
//   constructor(private readonly authService: AuthService) { }
//   @Patch('/update_email')
//   update(@Body(new ValidationPipe()) createAuthDto: UpdateAuthDto) {
//     return this.authService.update(createAuthDto);
//   }
// }

