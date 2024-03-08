import { User } from 'src/auth/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubmitAssignment } from './submit_assignment.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  path: string;
  @CreateDateColumn()
  createdAt: Date;
  @Column({ type: 'date' })
  deadLine: Date;
  @ManyToOne(() => Course, (course) => course.assignments, { cascade: true })
  @JoinColumn()
  course: Course;
  @ManyToOne(() => User, (user) => user.createAssignments, { cascade: true })
  @JoinColumn()
  createBy: User;
  @OneToMany(
    () => SubmitAssignment,
    (submitAssignment) => submitAssignment.assignment,
  )
  submits: SubmitAssignment[];
}
