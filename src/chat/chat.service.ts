import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createChatDto: CreateChatDto, currentUser: User) {
    const receiverId = await this.userRepository.findOne({
      where: { id: createChatDto.receiverId },
    });
    if (createChatDto.chatId != null) {
      const chat = await this.findOne(createChatDto.chatId); //!!!!! change to
      if (chat) {
        return await this.createMessage(
          createChatDto,
          chat,
          receiverId,
          currentUser,
        );
      }
      throw new NotFoundException('Chat Not Found');
    }
    let chat = new Chat();
    chat.users = [currentUser, receiverId];
    chat = await this.chatRepository.save(chat);
    return await this.createMessage(
      createChatDto,
      chat,
      receiverId,
      currentUser,
    );
  }

  async createMessage(
    createChatDto: CreateChatDto,
    chat: Chat,
    receiverId: User,
    currentUser: User,
  ) {
    const message = new Message();
    message.content = createChatDto.content;
    message.chat = chat;
    message.receiverId = receiverId;
    // message.receiverId = createChatDto.receiverId;
    message.senderId = currentUser;
    return await this.messageRepository.save(message);
  }

  async findAll(currentUser: User) {
    return await this.chatRepository.find({
      where: { users: { id: currentUser.id } },
      relations: { messages: true },
      select: {
        messages: {
          content: true,
          messageType: true,
          isRead: true,
          createdAt: true,
        },
      },
      order: {
        messages: { createdAt: 'DESC' },
      },
    });
  }
  // TODO last message appear
  async findOne(id: number) {
    return await this.chatRepository.findOne({
      where: { id },
      relations: { messages: true },
      select: {
        messages: {
          content: true,
          messageType: true,
          isRead: true,
          createdAt: true,
        },
      },
      order: {
        messages: { createdAt: 'ASC' },
      },
    });
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
