import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersRegistrations } from './users-registrations.entity';
import { ChangeTime } from './change-time.entity';

@Entity()
export class RegistrationMethods extends ChangeTime  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 60, nullable: false, unique: true })
  name: string;

  @OneToMany((ur) => UsersRegistrations, (ur) => ur.registrationMethod)
  relatedRegistrations: UsersRegistrations[];
}
