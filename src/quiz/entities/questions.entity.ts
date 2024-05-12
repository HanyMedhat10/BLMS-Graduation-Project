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
  content: string;
  @Column({ nullable: true })
  answer: string;
  @Column({ default: 0 })
  degree: number;
  @Column({
    type: 'enum',
    enum: QuestionsType,
    default: QuestionsType.SINGLE_CHOICE,
  })
  questionType: QuestionsType;
  @ManyToOne(() => Quiz, (quiz) => quiz.questions, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  quiz: Quiz;
  @OneToMany(() => Choice, (choices) => choices.question)
  choices: Choice[];
  @OneToMany(() => SubmitQuestion, (submitQuestion) => submitQuestion.question)
  submitQuestions: SubmitQuestion[];
}
