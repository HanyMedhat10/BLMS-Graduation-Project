import { User } from 'src/auth/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import { SubmitAssignment } from 'src/submit-assignment/entities/submit-assignment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @ManyToOne(() => Course, (course) => course.assignments)
  @JoinColumn()
  course: Course;
  @ManyToOne(() => User, (user) => user.createAssignments)
  @JoinColumn()
  createBy: User;
  @OneToMany(
    () => SubmitAssignment,
    (submitAssignment) => submitAssignment.assignment,
    {
      cascade: true,
    },
  )
  submits: SubmitAssignment[];
}
