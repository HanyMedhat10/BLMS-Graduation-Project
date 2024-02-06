import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class College {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @OneToOne(() => User, (user) => user.dean)
  @JoinColumn()
  DeanOfCollege: User;
  @OneToMany(() => User, (user) => user.college)
  hasUser: User[];
}
