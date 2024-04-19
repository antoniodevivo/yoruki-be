import { Injectable } from '@nestjs/common';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
    private readonly users: Users[] = [
        {
            id: 1,
            name: "mambo",
            email: "mambo@gmail.com",
        },
        {
            id: 2,
            name: "dumbo",
            email: "dumbo@gmail.com",
        },
    ]

    findOneByEmail(email: string): Users | undefined{
        return this.users.find((user) => user.email === email)
    }
}
