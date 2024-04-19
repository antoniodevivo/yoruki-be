import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import Strategy from "passport-magic-login"
import { AuthService } from "./auth.service";

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(MagicLoginStrategy.name);

    constructor(private authService: AuthService) {
        super({
            secret: process.env.PASSPORT_MAGIC_LINK_SECRET,
            jwtOptions: {
                expireIn: "30m"
            },
            callbackUrl: `${process.env.SERVER_URL}/auth/login/magic-link-interceptor`,
            sendMagicLink: async (destination, href) => {
                // TODO: send email
                this.logger.debug(`sending email to ${destination} with link ${href}`)
            },
            verify: async(payload, callback) => {
                callback(null, this.validate(payload))
            }
        })
    }

    validate(payload: { destination: string }) {
        const user = this.authService.validateUser(payload.destination)
        return user;
    }
}