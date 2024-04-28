import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { CreateChatDto } from './dto/create-chat.dto';
import { User } from 'src/auth/entities/user.entity';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
@ApiTags('Chat Module')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('createChat')
  async create(
    @Body() createChatDto: CreateChatDto,
    @CurrentUser() currentUser: User,
  ) {
    return await this.chatService.create(createChatDto, currentUser);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('createMessage')
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @CurrentUser() currentUser: User,
  ) {
    const chat = await this.chatService.findOne(createMessageDto.chatId);
    return await this.chatService.createMessage(
      createMessageDto,
      chat,
      currentUser,
    );
    // this.server.emit('createChat', message);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('findAllChat')
  async findAll(@CurrentUser() currentUser: User) {
    return await this.chatService.findAll(currentUser);
    // this.server.emit('findAllChat', chats);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('findOneChat/:id')
  async findOne(@Param('id') id: number) {
    return await this.chatService.findOne(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('updateMessage/:id')
  async updateMessage(
    @Param('id') id: string,
    @Body() updateChatDto: UpdateMessageDto,
    @CurrentUser() currentUser: User,
  ) {
    return await this.chatService.updateMessage(
      +id,
      updateChatDto,
      currentUser,
    );
    // this.server.emit('updateMessage', message);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('removeChat/:id')
  async remove(@Param('id') id: number) {
    return await this.chatService.remove(id);
    // this.server.emit('removeChat', null);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('removeMessage/:id')
  async removeMessage(
    @Param('id') id: string,
    @CurrentUser() currentUser: User,
  ) {
    console.log(currentUser);
    console.log(id);
    return await this.chatService.removeMessage(+id, currentUser);
    // this.server.emit('removeMessage', null);
  }
}
