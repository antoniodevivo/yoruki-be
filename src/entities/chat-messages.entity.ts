import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ChatRooms } from './chat-rooms.entity';
import { Users } from './users.entity';
import { ChangeTime } from './change-time.entity';

@Entity()
export class ChatMessages extends ChangeTime {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true })
  file: string;

  @ManyToOne((type) => Users, (user) => user.relatedChatMessages, { nullable: false })
  owner: Users;

  @ManyToOne((type) => ChatMessages, (chatMessage) => chatMessage.linkedMessages, { nullable: true })
  replyTo: ChatMessages;

  @OneToMany((type) => ChatMessages, (chatMessage) => chatMessage.replyTo)
  linkedMessages: ChatMessages[]

  @ManyToOne((type) => ChatRooms, (chatRoom) => chatRoom.relatedMessages, { nullable: false })
  room: ChatRooms;
}
