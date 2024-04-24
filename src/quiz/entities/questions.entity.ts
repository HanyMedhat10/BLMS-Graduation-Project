import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { QuestionsType } from './enum/questions-type.enum';
import { Options } from './choice.entity';
import { Quiz } from './quiz.entity';

@Entity()
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  question: string;
  @Column({ nullable: true })
  answer: string;
  @Column({ type: 'enum', enum: QuestionsType })
  questionType: QuestionsType;
  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  @JoinColumn()
  quiz: Quiz;
  @OneToMany(() => Options, (options) => options.question, { cascade: true })
  options: Options[];
}
