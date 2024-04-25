import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { QuestionsType } from './enum/questions-type.enum';
import { Choice } from './choice.entity';
import { Quiz } from './quiz.entity';
import { SubmitQuestion } from 'src/submit-quiz/entities/submit-question.entity';

@Entity()
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  question: string;
  @Column({ nullable: true })
  answer: string;
  @Column()
  degree: number;
  @Column({ type: 'enum', enum: QuestionsType })
  questionType: QuestionsType;
  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  @JoinColumn()
  quiz: Quiz;
  @OneToMany(() => Choice, (choices) => choices.question, { cascade: true })
  choices: Choice[];
  @OneToMany(() => SubmitQuestion, (submitQuestion) => submitQuestion.question)
  submitQuestions: SubmitQuestion[];
}
