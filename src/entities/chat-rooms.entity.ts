import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ChatRoomsTypes } from './chat-rooms-types.entity';
import { ChatMessages } from './chat-messages.entity';
import { ChatRoomsSystemStatuses } from './chat-rooms-system-statuses.entity';
import { ChatRoomsRoles } from './chat-rooms-roles.entity';
import { ChangeTime } from './change-time.entity';

@Entity()
export class ChatRooms extends ChangeTime  {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 60, nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne((type) => ChatRoomsTypes, (roomsType) => roomsType.relatedRooms, { nullable: false })
  type: ChatRoomsTypes;

  @ManyToOne((type) => ChatRoomsSystemStatuses, (roomsStatus) => roomsStatus.relatedRooms, { nullable: false })
  systemStatus: ChatRoomsSystemStatuses;

  @OneToMany((type) => ChatMessages, (chatMessage) => chatMessage.room)
  relatedMessages: ChatMessages[];

  @OneToMany((type) => ChatRoomsRoles, (chatRoomsRole) => chatRoomsRole.room)
  roles: ChatRoomsRoles[];

  @BeforeInsert()
  async hashPasword() {
    this.password = await bcrypt.hash(this.password, process.env.BCRYPT_SALT);
  }
}
