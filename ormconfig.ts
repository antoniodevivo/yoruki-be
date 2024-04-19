import { ChatMessages } from 'src/entities/chat-messages.entity';
import { ChatRoomsRolesPermissions } from 'src/entities/chat-rooms-roles-permissions.entity';
import { ChatRoomsRoles } from 'src/entities/chat-rooms-roles.entity';
import { ChatRoomsSystemStatuses } from 'src/entities/chat-rooms-system-statuses.entity';
import { ChatRoomsTypes } from 'src/entities/chat-rooms-types.entity';
import { ChatRooms } from 'src/entities/chat-rooms.entity';
import { SystemRoles } from 'src/entities/system-roles.entity';
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
    ChatRooms,
    ChatRoomsRoles,
    ChatRoomsRolesPermissions,
    ChatRoomsTypes,
    ChatRoomsSystemStatuses,
    ChatMessages,
  ],
  synchronize: true,
};

export default config;
