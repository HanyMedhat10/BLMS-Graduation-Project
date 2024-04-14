import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { RoleGuard } from 'src/auth/role/role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';

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
  findAll(@CurrentUser() currentUser: User) {
    return this.chatService.findAll(currentUser);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
