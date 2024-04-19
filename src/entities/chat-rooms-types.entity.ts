import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatRooms } from './chat-rooms.entity';
import { ChangeTime } from './change-time.entity';

@Entity()
export class ChatRoomsTypes extends ChangeTime  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 60, nullable: false, unique: true })
  name: string;

  @OneToMany((type) => ChatRooms, (room) => room.type)
  relatedRooms: ChatRooms[];
}
