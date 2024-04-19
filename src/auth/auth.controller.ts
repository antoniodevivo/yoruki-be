import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MagicLoginStrategy } from './magiclogin.strategy';
import { PasswordlessLoginDto } from './passwordless-login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private authStrategy: MagicLoginStrategy
  ) { }

  @Post("login")
  login(@Req() req, @Res() res, @Body() body: PasswordlessLoginDto) {
    this.authService.validateUser(body.destination)
    return this.authStrategy.send(req, res);
  }

  @UseGuards(AuthGuard("magicLogin"))
  @Get("login/magic-link-interceptor")
  loginLinkInterceptor(@Req() req) {
    return this.authService.generateJWT(req.user)
  }
}
