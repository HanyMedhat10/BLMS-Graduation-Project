import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './enum/user.enum';
import { Student } from 'src/student/entities/student.entity';
import { College } from './college.entity';

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
  @ManyToOne(() => User)
  @JoinColumn()
  addedBy: User;
  //   @Column({ type: 'enum', enum: Role, array: true, default: [Role.USER] })
  @Column({ type: 'enum', enum: Role })
  role: Role;
  @OneToOne(() => College, (college) => college.DeanOfCollege)
  dean: College;
  @ManyToOne(() => College, (college) => college.hasUser,{
    cascade: true,
  })
  @JoinTable()
  college: College;
  @CreateDateColumn()
  createdAt: Timestamp;
  @UpdateDateColumn()
  updatedAt: Timestamp;
  @OneToOne(() => Student, (student) => student.user, { cascade: true })
  student: Student;
}
