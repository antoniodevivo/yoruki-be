import { RegistrationMethods } from 'src/entities/registration-methods.entity';
import { SystemRoles } from 'src/entities/system-roles.entity';
import { UsersRegistrations } from 'src/entities/users-registrations.entity';
import { Users } from 'src/entities/users.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'ivity',
  host: 'localhost',
  port: 9002,
  username: 'postgres',
  password: 'postgres',
  entities: [
    Users,
    SystemRoles,
    RegistrationMethods,
    UsersRegistrations
  ],
  synchronize: true,
};

export default config;
