import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { DepartmentService } from 'src/department/department.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly departmentService: DepartmentService,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    const department = await this.departmentService.findOne(
      createCourseDto.department,
    );
    if (!department) throw new NotFoundException('Department Not found');
    const course = new Course();
    course.name = createCourseDto.name;
    course.department = department;
    return await this.courseRepository.save(course);
  }

  async findAll() {
    return await this.courseRepository.find({
      relations: { department: true },
    });
  }

  async findOne(id: number) {
    return await this.courseRepository.findOne({
      where: { id },
      relations: { department: true },
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.findOne(id);
    if (updateCourseDto.department != null) {
      const department = await this.departmentService.findOne(
        updateCourseDto.department,
      );
      if (!department) throw new NotFoundException('Department Not found');
      course.department = department;
    }
    course.name = updateCourseDto.name;

    return await this.courseRepository.save(course);
  }

  async remove(id: number) {
    return await this.courseRepository.delete(id);
  }
}
