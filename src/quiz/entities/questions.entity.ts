import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionsType } from './enum/questions-type.enum';

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
  //   con;
}
