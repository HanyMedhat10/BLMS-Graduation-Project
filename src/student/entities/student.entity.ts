import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentType } from './enum/student.enum';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  classes: string;
  @Column({ nullable: true })
  degreeProgram: string;
  @Column({ type: 'enum', enum: StudentType })
  studentType: StudentType;
  @OneToOne(() => User, (user) => user.student)
  @JoinColumn()
  user: User;
}
