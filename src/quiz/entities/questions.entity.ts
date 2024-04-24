import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionsType } from './enum/questions-type.enum';
import { Choice } from './choice.entity';

@Entity()
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  question: string;
  @Column()
  answer: string;
  @Column({ type: 'enum', enum: QuestionsType })
  questionType: QuestionsType;
  @OneToMany(() => Choice, (choice) => choice.question, { cascade: true })
  choice: Choice[];
}
