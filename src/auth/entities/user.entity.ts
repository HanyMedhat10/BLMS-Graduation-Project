import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './enum/user.enum';
import { Student } from 'src/student/entities/student.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ select: false })
  password: string;
  @OneToOne(() => User)
  @JoinColumn()
  addedBy: User;
  //   @Column({ type: 'enum', enum: Role, array: true, default: [Role.USER] })
  @Column({ type: 'enum', enum: Role })
  role: Role;
  @CreateDateColumn()
  createdAt: Timestamp;
  @UpdateDateColumn()
  updatedAt: Timestamp;
  @OneToOne(() => Student, (student) => student.user, { cascade: true })
  student: Student;
}
