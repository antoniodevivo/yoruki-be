import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ChatMessages } from './chat-messages.entity';
import { ChangeTime } from './change-time.entity';
import { ChatRoomsRoles } from './chat-rooms-roles.entity';
import { SystemRoles } from './system-roles.entity';

@Entity()
export class Users extends ChangeTime {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 60, nullable: true })
  fullName: string;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", length: 20, nullable: false, unique: true })
  username: string;

  @OneToMany((type) => ChatMessages, (chatMessages) => chatMessages.owner)
  relatedChatMessages: ChatMessages[];

  @ManyToMany(() => ChatRoomsRoles)
  @JoinTable()
  chatRoomsRoles: ChatRoomsRoles[]

  @ManyToOne((type) => SystemRoles, (systemRole) => systemRole.relatedUsers, { nullable: true })
  systemRole: SystemRoles;

  @BeforeInsert()
  async hashPasword() {
    this.password = await bcrypt.hash(this.password, process.env.BCRYPT_SALT);
  }
}

//let regex = /^[a-z0-9_.]+$/;