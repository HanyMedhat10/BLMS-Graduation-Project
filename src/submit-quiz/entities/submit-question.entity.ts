import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubmitQuiz } from './submit-quiz.entity';
import { Questions } from 'src/quiz/entities/questions.entity';
@Entity()
export class SubmitQuestion {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  answer: string;
  @Column({ nullable: true })
  degree: number;
  @ManyToOne(() => SubmitQuiz, (submitQuiz) => submitQuiz.submitQuestions)
  @JoinColumn({ name: 'submitQuizId' })
  submitQuiz: SubmitQuiz;
  @ManyToOne(() => Questions, (questions) => questions.submitQuestions)
  @JoinColumn({ name: 'questionId' })
  question: Questions;
}
