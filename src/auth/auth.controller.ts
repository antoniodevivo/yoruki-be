import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MagicLoginStrategy } from './guards/magiclogin.strategy';
import { PasswordlessLoginDto } from '../dto/passwordless-login.dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { MagicLoginGuard } from './guards/magiclogin-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private authStrategy: MagicLoginStrategy
  ) { }


  @Post("login")
  login(@Req() req, @Res() res, @Body() body: PasswordlessLoginDto) {
    this.authService.validateUser(body.destination)
    this.authStrategy.sendMagicLink(body.destination, {});
    return res.send({ success: true });
  }


  @Get("login/magic-link-interceptor")
  @UseGuards(MagicLoginGuard)
  async loginLinkInterceptor(@Req() req, @Res() res) {
    console.log(req)
    return res.send({ success: true });
    try {
      const jwt = await this.authService.generateJWT(req.user);
      res.cookie('YORUKI_JWT', jwt.access_token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      res.redirect(`${process.env.FRONTEND_URL}/`);
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
    }
  }


  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res) {
    try {
      const jwt = await this.authService.generateJWT(req.user);
      res.cookie('YORUKI_JWT', jwt.access_token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      res.redirect(`${process.env.FRONTEND_URL}/`);
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
    }
  }
}
