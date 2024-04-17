import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { RoleGuard } from 'src/auth/role/role.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { UpdateMessageDto } from './dto/update-message.dto';
@ApiTags('Chat Module')
@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer() server: Server;
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SubscribeMessage('createChat')
  async create(
    @MessageBody() createChatDto: CreateChatDto,
    @CurrentUser() currentUser: User,
  ) {
    const chat = await this.chatService.create(createChatDto, currentUser);
    this.server.emit('createChat', chat);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SubscribeMessage('findAllChat')
  async findAll(@CurrentUser() currentUser: User) {
    const chats = await this.chatService.findAll(currentUser);
    this.server.emit('findAllChat', chats);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SubscribeMessage('findOneChat')
  async findOne(@MessageBody() id: number) {
    return await this.chatService.findOne(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SubscribeMessage('updateMessage')
  async updateMessage(
    @MessageBody() updateChatDto: UpdateMessageDto,
    @CurrentUser() currentUser: User,
  ) {
    const message = await this.chatService.updateMessage(
      updateChatDto,
      currentUser,
    );
    this.server.emit('updateMessage', message);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SubscribeMessage('removeChat')
  async remove(@MessageBody() id: number) {
    await this.chatService.remove(id);
    this.server.emit('removeChat', null);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SubscribeMessage('removeMessage')
  async removeMessage(
    @MessageBody() id: number,
    @CurrentUser() currentUser: User,
  ) {
    await this.chatService.removeMessage(id, currentUser);
    this.server.emit('removeMessage', null);
  }
}
