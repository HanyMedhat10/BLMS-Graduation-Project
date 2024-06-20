import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { In, Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/auth/entities/enum/user.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DepartmentService } from 'src/department/department.service';
import { CourseService } from 'src/course/course.service';
import { Course } from 'src/course/entities/course.entity';
import { TeachCourses } from './dto/teach-courses.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly userService: AuthService,
    private readonly departmentService: DepartmentService,
    private readonly courseService: CourseService,
  ) {}
  async create(createDoctorDto: CreateDoctorDto, currentUser: User) {
    return await this.userService.createDR(createDoctorDto, currentUser);
  }
  async addTeachingCourse(id: number, courses: TeachCourses): Promise<User> {
    const dr = await this.findOne(id);
    const course = await this.courseRepository.find({
      where: { id: In(courses.courses) },
    });
    for (let index = 0; index < course.length; index++) {
      const element = course[index];
      dr.teachingCourses.push(element);
    }
    await this.userRepository.save(dr);
    return dr;
  }

  async findAll() {
    return await this.userRepository.find({
      where: { role: Role.DR },
      relations: {
        department: true,
        college: true,
        teachingCourses: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id, role: Role.DR },
      relations: {
        department: true,
        college: true,
        teachingCourses: true,
      },
    });
  }

  async update(
    id: number,
    updateDoctorDto: UpdateDoctorDto,
    currentUser: User,
  ) {
    const doctor = await this.findOne(id);
    if (!doctor) {
      throw new NotFoundException(`This id: ${id} not found `);
    }

    // doctor = await this.userRepository.save(doctor);
    const college = await this.userService.preloadCollegeById(
      updateDoctorDto.college,
    );
    // const user = await this.findOne(id);
    delete updateDoctorDto.password;
    Object.assign(doctor, updateDoctorDto);
    doctor.addedBy = currentUser;
    doctor.college = college;
    if (updateDoctorDto.teachingCourses != null) {
      const teachingCourses = await Promise.all(
        updateDoctorDto.teachingCourses.map((x) =>
          this.courseService.findOne(x),
        ),
      );
      doctor.teachingCourses = teachingCourses;
    }
    if (updateDoctorDto.department != null) {
      const department = await this.departmentService.findOne(
        updateDoctorDto.department,
      );
      doctor.department = department;
    }
    return await this.userRepository.save(doctor);
  }
  async remove(id: number) {
    const doctor = await this.findOne(id);
    // if (doctor.teachingCourses != null) {
    //   throw new BadRequestException('The Doctor teaching courses');
    // }
    return await this.userRepository.delete(doctor.id);
  }
  async removeCourse(id: number, courses: TeachCourses) {
    const dr = await this.findOne(id);
    for (let index = 0; index < courses.courses.length; index++) {
      const element = courses.courses[index];
      dr.teachingCourses = dr.teachingCourses.filter((course) => {
        return course.id !== element;
      });
    }
    return await this.userRepository.save(dr);
  }
}
