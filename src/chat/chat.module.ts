import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
