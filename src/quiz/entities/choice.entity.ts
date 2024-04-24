import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Questions } from './questions.entity';

@Entity()
export class Options {
  @Column({ type: 'integer', unsigned: true, generated: 'increment' })
  id: number;
  @Column()
  options: string;
  @ManyToOne(() => Questions, (questions) => questions.options)
  @JoinColumn({ name: 'question_id' })
  question: Questions;
}
