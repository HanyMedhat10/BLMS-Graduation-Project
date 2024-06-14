import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Questions } from './questions.entity';

@Entity()
export class Choice {
  @PrimaryGeneratedColumn()
  id: number;
  // @Column({ type: 'int', generated: 'increment' })
  // counter: number;
  @Column()
  option: string;
  @ManyToOne(() => Questions, (questions) => questions.choices)
  @JoinColumn({ name: 'question_id' })
  question: Questions;
}
