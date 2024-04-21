import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ChangeTime } from './change-time.entity';
import { RegistrationMethods } from './registration-methods.entity';
import { Users } from './users.entity';

@Entity()
export class UsersRegistrations extends ChangeTime  {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "varchar", length: 60, nullable: false })
  email: string;

  @ManyToOne((users) => Users, (users) => users.registrations, { nullable: false })
  owner: Users;

  @ManyToOne((rm) => RegistrationMethods, (rm) => rm.relatedRegistrations, { nullable: false })
  registrationMethod: RegistrationMethods;
}
