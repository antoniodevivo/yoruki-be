import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChangeTime } from './change-time.entity';

@Entity()
export class ChatRoomsRolesPermissions extends ChangeTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 60, nullable: false })
  name: string;
}
