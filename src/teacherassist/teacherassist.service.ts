import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherAssistant } from './entities/teacherassist.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/user.entity';
import { CreateTeacherAssistUserDto } from './dto/create-teacherassist-user.dto';
import { UpdateTeacherAssistUserDto } from './dto/update-teacherassist-user.dto';
import { Role } from 'src/auth/entities/enum/user.enum';
import { CourseService } from 'src/course/course.service';
import { DepartmentService } from 'src/department/department.service';

@Injectable()
export class TeacherassistService {
  constructor(
    @InjectRepository(TeacherAssistant)
    private readonly teacherAssistantRepository: Repository<TeacherAssistant>,
    private readonly userService: AuthService,
    private readonly courseService: CourseService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly departmentService: DepartmentService,
  ) {}
  async create(
    createTeacherassistDto: CreateTeacherAssistUserDto,
    currentUser: User,
  ) {
    return await this.userService.createTA(createTeacherassistDto, currentUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      where: { role: Role.TA },
      relations: {
        teacherAssistant: { courses: true },
        college: true,
        department: true,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id, role: Role.TA },
      relations: {
        teacherAssistant: { courses: true },
        college: true,
        department: true,
        addedBy: true,
      },
    });
  }

  async update(
    id: number,
    updateTeacherAssistUserDto: UpdateTeacherAssistUserDto,
    currentUser: User,
  ): Promise<User> {
    let teacherAssistant = await this.teacherAssistantRepository.findOne({
      where: { user: { id: id } },
    });
    if (updateTeacherAssistUserDto.teacherAssistant != null) {
      if (updateTeacherAssistUserDto.teacherAssistant.courses != null) {
        const courses = await Promise.all(
          updateTeacherAssistUserDto.teacherAssistant.courses.map((x) =>
            this.courseService.findOne(x),
          ),
        );
        teacherAssistant = await this.teacherAssistantRepository.preload({
          id: teacherAssistant.id, // if id is string , we should id:+id to convert number
          ...updateTeacherAssistUserDto.teacherAssistant,
          courses,
        });
      } else
        Object.assign(
          teacherAssistant,
          updateTeacherAssistUserDto.teacherAssistant,
        );
    }
    if (!teacherAssistant) {
      throw new NotFoundException(`This id: ${id} not found `);
    }

    teacherAssistant =
      await this.teacherAssistantRepository.save(teacherAssistant);
    const college = await this.userService.preloadCollegeByName(
      updateTeacherAssistUserDto.college,
    );
    const user = await this.findOne(id);
    delete updateTeacherAssistUserDto.password;
    Object.assign(user, updateTeacherAssistUserDto);
    user.teacherAssistant = teacherAssistant;
    user.addedBy = currentUser;
    user.college = college;
    if (updateTeacherAssistUserDto.department != null) {
      const department = await this.departmentService.findOne(
        updateTeacherAssistUserDto.department,
      );
      user.department = department;
    }
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const ta = await this.findOne(id);
    await this.teacherAssistantRepository.delete(ta.teacherAssistant.id);
    return await this.userRepository.delete(id);
    return `This action removes a #${id} teacherassist`;
  }
}
