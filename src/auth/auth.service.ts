import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { aesEncrypt } from 'src/utils/crypto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    checkUserIsNotRegistered(email: string) {
        const user = this.usersService.findOneByEmail(email)

        if (user)
            throw new HttpException('Email already registered', HttpStatus.CONFLICT);

        return true;
    }

    checkUserIsRegistered(email: string) {
        const user = this.usersService.findOneByEmail(email)

        if (!user)
            throw new UnauthorizedException();

        return user;
    }

    retrieveUser(email: string) {
        return this.usersService.findOneByEmail(email);
    }

    generateJWT({
        payload,
        expiresIn = process.env.JWT_EXPIRATION
    }) {
        if (payload.isSecret)
            payload = {
                secret: aesEncrypt(JSON.stringify(payload))
            }

        return {
            access_token: this.jwtService.sign({
                payload,
                options: { expiresIn: expiresIn }
            })
        }
    }

    verifyJWT(jwt: string) {
        let err, decodedJWT;

        try {
            decodedJWT = this.jwtService.verify(jwt);
        } catch (error) {
            err = error
        }

        return [err, decodedJWT];
    }

    async setJwtCookie(req: any, res: any, extraPayload: any = null) {
        let payload = {}

        if (extraPayload)
            payload = extraPayload

        payload["user"] = req.user
        
        const jwt = await this.generateJWT({
            payload
        });
        res.cookie('YORUKI_JWT', jwt.access_token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
    }

}
