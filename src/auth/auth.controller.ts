import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
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

  @Post("register")
  register(@Req() req, @Res() res, @Body() body: PasswordlessLoginDto) {
    this.authService.checkUserIsNotRegistered(body.email)
    this.authStrategy.sendMagicLink(body.email, {
      action: {
        type: "register",
        method: "email"
      },
      user: {
        email: body.email
      },
      isSecret: true
    });
    return res.send({ success: true });
  }

  @Post("login")
  login(@Req() req, @Res() res, @Body() body: PasswordlessLoginDto) {
    const user = this.authService.checkUserIsRegistered(body.email)
    this.authStrategy.sendMagicLink(body.email, {
      action: {
        type: "login",
        method: "email"
      },
      user: user,
      isSecret: true
    });
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
      const user = this.authService.retrieveUser(req.user.email)

      if (!user) {

        this.authStrategy.sendMagicLink(req.user.email, {
          action: {
            type: "register",
            method: "google"
          },
          user: {
            email: req.user.email
          }
        });

        return res.status(HttpStatus.NOT_FOUND).json({
          message: `User not found. Sent confirmation email to ${req.user.email}`,
        });
      }

      const jwt = await this.authService.generateJWT({
        payload: {
          user: req.user
        }
      });
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
