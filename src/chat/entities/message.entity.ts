import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Chat } from './chat.entity';
import { MessageType } from './enum/type.message.enum';

@Entity()
export class Message {
  @PrimaryColumn({ primary: false, unique: true })
  // @PrimaryColumn()
  id: number;
  @Column({ nullable: true })
  content: string;
  @Column({ type: 'enum', enum: MessageType, default: 'text' })
  messageType: string;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  // @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.sentMessages)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  @JoinColumn()
  chat: Chat;
}
