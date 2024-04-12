import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from 'src/auth/entities/user.entity';
@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ default: false })
  isGroup: boolean;
  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable({ name: 'user_chat' })
  users: User[];
}
