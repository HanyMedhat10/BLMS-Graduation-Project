import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherAssistant } from './entities/teacherassist.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/user.entity';
import { CreateTeacherAssistUserDto } from './dto/create-teacherassist-user.dto';
import { UpdateTeacherAssistUserDto } from './dto/update-teacherassist-user.dto';
import { Role } from 'src/auth/entities/enum/user.enum';

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

  async findAll() {
    return await this.userRepository.find({
      where: { role: Role.TA },
      relations: {
        teacherAssistant: { courses: true },
        college: true,
        department: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id, role: Role.TA },
      relations: {
        teacherAssistant: { courses: true },
        college: true,
        department: true,
      },
    });
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
