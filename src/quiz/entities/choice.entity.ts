import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Questions } from './questions.entity';

@Entity()
export class Choice {
  @Column({ type: 'integer', unsigned: true, generated: 'increment' })
  id: number;
  @Column()
  choice: string;
  @ManyToOne(() => Questions, (questions) => questions.choice)
  @JoinColumn({ name: 'question_id' })
  question: Questions;
}
