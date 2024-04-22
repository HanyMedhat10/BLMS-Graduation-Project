import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;
  //@Column()
  //   con;
}
