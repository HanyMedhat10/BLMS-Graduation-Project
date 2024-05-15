import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';

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
        return await this.createMessage(createChatDto, chat, currentUser);
      }
      throw new NotFoundException('Chat Not Found');
    }
    let chat = new Chat();
    chat.users = [currentUser, receiverId];
    chat = await this.chatRepository.save(chat);
    await this.createMessage(createChatDto, chat, currentUser);
    return chat;
  }

  async createMessage(
    createMessageDto: CreateMessageDto,
    chat: Chat,
    currentUser: User,
  ) {
    const message = new Message();
    message.content = createMessageDto.content;
    // console.log('after saving create message', message);
    message.chat = chat;
    // message.receiverId = createChatDto.receiverId;
    message.sender = currentUser;
    return await this.messageRepository.save(message);
  }

  async findAll(currentUser: User) {
    const chatsUsers = await this.userRepository.findOne({
      where: { id: currentUser.id },
      relations: { chats: true },
    });
    let chats = await this.chatRepository.find({
      where: { id: In(chatsUsers.chats.map((chat) => chat.id)) },
      relations: { messages: { sender: true }, users: true },
      select: {
        users: { id: true, name: true, email: true, profileImage: true },
        messages: {
          id: true,
          content: true,
          messageType: true,
          isRead: true,
          sender: {
            id: true,
            name: true,
            email: true,
          },
          createdAt: true,
        },
      },
      order: {
        messages: {
          createdAt: 'DESC',
        },
      },
    });
    chats = chats.map((chat) => {
      chat.messages[0];
      return chat;
    });
    return chats;
  }
  async findOne(id: number) {
    return await this.chatRepository.findOne({
      where: { id },
      relations: { messages: { sender: true }, users: true },
      select: {
        users: { id: true, name: true, email: true, profileImage: true },
        messages: {
          id: true,
          content: true,
          sender: {
            id: true,
            name: true,
            email: true,
          },
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

  async updateMessage(
    id: number,
    updateChatDto: UpdateMessageDto,
    currentUser: User,
  ) {
    // const Chat = await this.chatRepository.findOne({
    //   where: { id: updateChatDto.chatId },
    // });
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: { sender: true },
    });
    if (currentUser.id != message.sender.id) throw new UnauthorizedException();
    message.content = updateChatDto.content;
    return await this.messageRepository.save(message);
    // return `This action updates a #${id} chat`;
  }

  async remove(id: number) {
    const chat = await this.findOne(id);
    chat.messages.forEach(async (message) => {
      await this.messageRepository.delete(message.id);
    });
    return await this.chatRepository.delete(id);
  }
  async removeMessage(id: number, currentUser: User) {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: { sender: true },
    });
    console.log(message);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    if (currentUser.id != message.sender.id) {
      throw new UnauthorizedException();
    }
    return await this.messageRepository.remove(message);
  }
}
