import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SubscribeMessage('createChat')
  create(
    @MessageBody() createChatDto: CreateChatDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.chatService.create(createChatDto, currentUser);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SubscribeMessage('findAllChat')
  async findAll(@CurrentUser() currentUser: User) {
    return await this.chatService.findAll(currentUser);
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
    return await this.chatService.updateMessage(updateChatDto, currentUser);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SubscribeMessage('removeChat')
  async remove(@MessageBody() id: number) {
    return await this.chatService.remove(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SubscribeMessage('removeChat')
  async removeMessage(
    @MessageBody() id: number,
    @CurrentUser() currentUser: User,
  ) {
    return await this.chatService.removeMessage(id, currentUser);
  }
}
