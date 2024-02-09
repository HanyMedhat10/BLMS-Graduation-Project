import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherAssistant } from './entities/teacherassist.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/user.entity';
import { CreateTeacherAssistUserDto } from './dto/create-teacherassist-user.dto';
import { UpdateTeacherAssistUserDto } from './dto/update-teacherassist-user.dto';

@Injectable()
export class TeacherassistService {
  constructor(
    @InjectRepository(TeacherAssistant)
    private readonly teacherAssistantRepository: Repository<TeacherAssistant>,
    private readonly userService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(
    createTeacherassistDto: CreateTeacherAssistUserDto,
    currentUser: User,
  ) {
    return await this.userService.createTA(createTeacherassistDto, currentUser);
  }

  findAll() {
    return `This action returns all teacherassist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacherassist`;
  }

  update(
    id: number,
    updateTeacherAssistUserDtoDto: UpdateTeacherAssistUserDto,
  ) {
    return `This action updates a #${id} teacherassist`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacherassist`;
  }
}
