import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { User } from 'src/auth/entities/user.entity';
@Entity()
export class Degree {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  degree: number;
  @Column()
  totalDegrees: number;
  @ManyToOne(() => Course, (course) => course.degrees)
  @JoinColumn()
  course: Course;
  @ManyToOne(() => User, (student) => student.degrees)
  @JoinColumn()
  student: User;
}
