import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { CurrentUserSocket } from 'src/utility/decorators/current-user-Socket.decorator';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
// import { UpdateMessageDto } from './dto/update-message.dto';
@ApiTags('Chat')
@WebSocketGateway({
  cors: {
    credentials: true,
    allowedHeaders: ['Authorization'],
    // cors: {
    //   origin: '*',
    // },
  },
  namespace: 'chat',
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;
  @ApiBearerAuth()
  //
  @SubscribeMessage('createChat')
  async create(
    @MessageBody() createChatDto: CreateChatDto,
    // @CurrentUserSocket() currentUser: User,
    @ConnectedSocket() client: Socket,
    @CurrentUserSocket() currentUser: User,
  ) {
    console.log(currentUser);
    const chat = await this.chatService.create(createChatDto, currentUser);
    client.join(chat.id.toString());
    client.emit('createChat', chat);
    return chat;
  }
  //
  @SubscribeMessage('createMessage')
  async createMessage(
    @MessageBody() createMessage: CreateMessageDto,
    @ConnectedSocket() client: Socket,
    @CurrentUserSocket() currentUser: User,
  ) {
    const chat = await this.chatService.findOne(createMessage.chatId);
    const message = await this.chatService.createMessage(
      createMessage,
      chat,
      currentUser,
    );
    client.broadcast.to(chat.id.toString()).emit('createMessage', message);
  }

  @SubscribeMessage('findAllChat')
  async findAllToUser(
    @ConnectedSocket() client: Socket,
    @CurrentUserSocket() currentUser: User,
  ) {
    const chats = await this.chatService.findAll(currentUser);
    client.emit('findAllChat', chats);
    return chats;
  }

  @ApiBearerAuth()
  @SubscribeMessage('findOneChat')
  async findOne(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    const chat = await this.chatService.findOne(id);
    client.emit('findOneChat', chat);
  }
  @ApiBearerAuth()
  @SubscribeMessage('updateMessage')
  async updateMessage(
    @MessageBody() updateChatDto: UpdateMessageDto,
    @CurrentUserSocket() currentUser: User,
  ) {
    const message = await this.chatService.updateMessage(
      updateChatDto.messageId,
      updateChatDto,
      currentUser,
    );
    this.server.emit('updateMessage', message);
    return message;
  }
  @ApiBearerAuth()
  @SubscribeMessage('removeChat')
  async remove(@MessageBody() id: number) {
    await this.chatService.remove(id);
    this.server.emit('removeChat', null);
  }
  @ApiBearerAuth()
  @SubscribeMessage('removeMessage')
  async removeMessage(
    @MessageBody() id: number,
    @CurrentUserSocket() currentUser: User,
  ) {
    await this.chatService.removeMessage(id, currentUser);
    this.server.emit('removeMessage id:', id);
  }
  // @SubscribeMessage('message')
  // handleMessage(@MessageBody() data: any, client: any) {
  //   console.log(data);
  //   return 'hello world';
  // }
}
