import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { aesDecrypt } from 'src/utils/crypto';

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

    generateMagicLink(payload: any): string {
        const jwt = this.authService.generateJWT({
            payload,
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
    
    // Validation functions
    checkTokenExists(req){
        if(!req.query.token) 
            throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);
    }

    checkJwtIsValid(jwt){
        let [err, decodedJWT] = this.authService.verifyJWT(jwt)

        if(err)
            throw new HttpException('Invalid JWT', HttpStatus.BAD_REQUEST);

        return decodedJWT;
    }

    checkJwtIsNotExpired(decodedJWT){
        let now = Date.now()
        var nowInSeconds = Math.floor(now / 1000);
        if(decodedJWT.exp < nowInSeconds)
            throw new HttpException('JWT expired', HttpStatus.BAD_REQUEST);
    }
    
    getOrDecryptPayload(payload){
        if(payload.secret){
            let payloadStr = aesDecrypt(payload.secret)
            return JSON.parse(payloadStr)
        }
        return payload
    }

    // ------------------------------------------------
    async validate(req) {

        this.checkTokenExists(req)
        let decodedJWT = this.checkJwtIsValid(req.query.token)
        this.checkJwtIsNotExpired(decodedJWT)
        const payload = this.getOrDecryptPayload(decodedJWT.payload)
        
        req.magicLinkValidatedPayload = payload
        
        return payload.user
    }
}