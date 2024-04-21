import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    validateUser(email: string) {
        const user = this.usersService.findOneByEmail(email)

        if (!user)
            throw new UnauthorizedException();

        return user;
    }

    generateJWT({
        payload, 
        expiresIn=process.env.JWT_EXPIRATION
    }) {
        return {
            access_token: this.jwtService.sign({
                payload, 
                options: {expiresIn: expiresIn}
            })
        }
    }

}
