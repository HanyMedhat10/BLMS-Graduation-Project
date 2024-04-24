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
import { Questions } from './questions.entity';

@Entity('quiz')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  degree: number;
  @CreateDateColumn()
  createdAt: Date;
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
  @ManyToOne(() => Course, (course) => course.quizzes)
  @JoinColumn()
  course: Course;
  @ManyToOne(() => User, (user) => user.createQuizzes)
  @JoinColumn()
  createBy: User;
  @OneToMany(() => Questions, (questions) => questions.quiz, {
    cascade: true,
  })
  questions: Questions[];
}
