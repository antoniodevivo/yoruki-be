import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChangeTime } from './change-time.entity';
import { Users } from './users.entity';

@Entity()
export class SystemRoles extends ChangeTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 60, nullable: false })
  name: string;

  @OneToMany((type) => Users, (user) => user.systemRole)
  relatedUsers: Users[];

}
