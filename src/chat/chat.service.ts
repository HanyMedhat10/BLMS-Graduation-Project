import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { UpdateMessageDto } from './dto/update-message.dto';

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
    let chats = await this.chatRepository.find({
      where: { users: { id: currentUser.id } },
      relations: { messages: true },
      select: {
        users: { id: true, name: true, email: true },
        messages: {
          id: true,
          content: true,
          messageType: true,
          isRead: true,
          senderId: {
            id: true,
            name: true,
            email: true,
          },
          receiverId: {
            id: true,
            name: true,
            email: true,
          },
          createdAt: true,
        },
      },
      order: {
        messages: { createdAt: 'DESC' },
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
      relations: { messages: true },
      select: {
        users: { id: true, name: true, email: true },
        messages: {
          id: true,
          content: true,
          senderId: {
            id: true,
            name: true,
            email: true,
          },
          receiverId: {
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

  async updateMessage(updateChatDto: UpdateMessageDto, currentUser: User) {
    const message = await this.messageRepository.findOne({
      where: { id: updateChatDto.id },
    });
    if (currentUser.id == message.receiverId.id) throw new NotFoundException();
    message.content = updateChatDto.content;
    return await this.messageRepository.save(message);
    // return `This action updates a #${id} chat`;
  }

  async remove(id: number) {
    await this.chatRepository.delete(id);
    return `This action removes a #${id} chat`;
  }
  async removeMessage(id: number, currentUser: User) {
    const message = await this.messageRepository.findOne({
      where: { id },
    });
    if (currentUser.id == message.receiverId.id)
      throw new NotFoundException(
        'You are not authorized to perform this action',
      );
    return await this.messageRepository.delete(id);
  }
}
