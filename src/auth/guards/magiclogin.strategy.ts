import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(Strategy, "magicLogin") {
    private readonly logger = new Logger(MagicLoginStrategy.name);

    private readonly callbackUrl = `${process.env.SERVER_URL}/auth/login/magic-link-interceptor`

    private readonly jwtOptions = {
        expiresIn: "30m"
    }

    constructor(private authService: AuthService) {
        super();
    }

    generateMagicLink(payload: any) {
        const jwt = this.authService.generateJWT({
            payload: payload,
            expiresIn: this.jwtOptions.expiresIn
        })
        return `${this.callbackUrl}?token=${jwt.access_token}`
    }

    sendMagicLink(destination: string, payload: any) {
        const magicLink = this.generateMagicLink(payload)

        const message = `sending email to ${destination} with link ${magicLink}`
        this.logger.debug(message)
        return true;
    }

    async validate(req) {
        console.log(req.query.token)
        return {
            email: "mambo@gmail.com"
        };
    }
}