import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.entity';
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

    generateJWT(user: Users) {
        const payload = {
            email: user.email
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
