import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Department } from 'src/department/entities/department.entity';

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
  @OneToMany(() => Department, (department) => department.college)
  departments: Department[];
}
