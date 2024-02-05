import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/auth/entities/enum/user.enum';
import { User } from 'src/auth/entities/user.entity';
import { CreateStudentUserDto } from './dto/create-student-user-dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly userService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createStudentUserDto: CreateStudentUserDto, currentUser: User) {
    return await this.userService.createStudent(
      createStudentUserDto,
      currentUser,
    );
  }

  async findAll() {
    // return await this.studentRepository.find({ relations: { user: true } });
    return await this.userRepository.find({
      where: { role: Role.STUDENT },
      relations: { student: true },
    });
  }

  async findOne(id: number) {
    // const student = await this.studentRepository.findOne({
    //   relations: { user: true },
    //   where: { user: { id: id } },
    // });
    // if (!student) throw new NotFoundException('the student not found');
    // return await this.userService.findOne(id);
    // return await this.userService.findOneUser(id, Role.STUDENT);
    const user = await this.userRepository.findOne({
      where: { id: id, role: Role.STUDENT },
      relations: { student: true },
    });
    if (!user) throw new NotFoundException(`the student Not Found`);
    return user;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    await this.studentRepository.delete(student.student.id);
    return await this.userService.remove(id);
  }
}
