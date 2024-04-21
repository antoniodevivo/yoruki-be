import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ChangeTime } from './change-time.entity';
import { SystemRoles } from './system-roles.entity';
import { UsersRegistrations } from './users-registrations.entity';

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

  @OneToMany((ur) => UsersRegistrations, (ur) => ur.owner)
  registrations: UsersRegistrations[];

  @ManyToOne((type) => SystemRoles, (systemRole) => systemRole.relatedUsers, { nullable: true })
  systemRole: SystemRoles;
}
