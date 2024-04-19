import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatRooms } from './chat-rooms.entity';
import { ChangeTime } from './change-time.entity';
import { ChatRoomsRolesPermissions } from './chat-rooms-roles-permissions.entity';

@Entity()
export class ChatRoomsRoles extends ChangeTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 60, nullable: false })
  name: string;

  @Column({ nullable: false })
  isTemplate: boolean = false;

  @ManyToOne((type) => ChatRooms, (room) => room.roles)
  room: ChatRooms;

  @ManyToMany(() => ChatRoomsRolesPermissions)
  @JoinTable()
  permissions: ChatRoomsRolesPermissions[]
}
