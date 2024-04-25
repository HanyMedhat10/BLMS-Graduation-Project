import { User } from 'src/auth/entities/user.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubmitQuestion } from './submit-question.entity';

@Entity()
export class SubmitQuiz {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  answer: string;
  @Column({ nullable: true })
  degree: number;
  @CreateDateColumn()
  submitTime: Date;
  @ManyToOne(() => User, (student) => student.submitQuizzes)
  @JoinColumn()
  solver: User;
  @ManyToOne(() => User, (staff) => staff.correctQuiz)
  @JoinColumn()
  correctBy: User;
  @ManyToOne(() => Quiz, (quiz) => quiz.submits)
  @JoinColumn()
  quiz: Quiz;
  @OneToMany(
    () => SubmitQuestion,
    (submitQuestion) => submitQuestion.submitQuiz,
  )
  submitQuestions: SubmitQuestion[];
}
