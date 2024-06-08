import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { DepartmentService } from 'src/department/department.service';
import * as fs from 'fs';
import { Degree } from './entities/degree.entity';
import { User } from 'src/auth/entities/user.entity';
import { DegreeClass } from './dto/degree.class';
@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Degree)
    private readonly degreeRepository: Repository<Degree>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
  async addDegrees(id: number, file: Express.Multer.File) {
    const course = await this.findOne(id);
    const students = [];
    const data = fs.readFileSync(file.path, { encoding: 'utf-8' });
    const results: DegreeClass[] = this.convertText2CSV(data);
    for (let i = 0; i < results.length; i++) {
      const degree = new Degree();
      console.log(results[i.toString()]);
      degree.course = course;
      degree.title = results[i].title;
      degree.degree = results[i].degree;
      degree.totalDegrees = results[i].totalDegrees;
      const student = await this.userRepository.findOne({
        where: { id: results[i].student, courses: { id: course.id } },
      });
      if (!student) {
        students.push(results[i].student);
        continue;
      }
      degree.student = student;
      console.log(i, degree);
      await this.degreeRepository.save(degree);
    }
    fs.unlinkSync(file.path);
    if (students.length > 0)
      return `All students are added successfully, but the following students with these ids do not exist: ${students.join(', ')}`;
    return 'All students are added successfully';
  }

  async findAll() {
    return await this.courseRepository.find({
      relations: { department: true, assignments: true, materials: true },
    });
  }
  async findAllParticipants(id: number): Promise<Course[]> {
    return await this.courseRepository.find({
      where: { id },
      relations: { teaching: true, students: true },
      // select: {
      //   id: true,
      //   name: true,
      //   Role: true,
      // },
    });
  }
  async findStaff(id: number): Promise<Course[]> {
    return await this.courseRepository.find({
      where: { id },
      relations: { teaching: true },
      // select: {
      //   id: true,
      //   name: true,
      //   Role: true,
      // },
    });
  }
  async searchByRole(id: number, role: string) {
    return await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.teaching', 'teaching')
      .leftJoinAndSelect('course.students', 'students')
      .where('students.role = :role OR teaching.role = :role', { role })
      .getMany();
  }
  async findByNameUser(id: number, name: string): Promise<Course> {
    return await this.courseRepository
      .createQueryBuilder('course')
      .where('course.id = :id', { id })
      .andWhere('(teaching.name ILIKE :name OR students.name ILIKE :name)', {
        name: `%${name}%`,
      })
      .leftJoinAndSelect('course.teaching', 'teaching')
      .leftJoinAndSelect('course.students', 'students')
      .getOne();
  }
  async findOne(id: number) {
    return await this.courseRepository.findOne({
      where: { id },
      relations: { department: true, assignments: true, materials: true },
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
  convertText2CSV(text: string) {
    const csvString = text;

    // Split the CSV string into lines
    const lines = csvString.split('\r\n');
    console.log(lines);

    // Initialize an array to store the objects
    const data: DegreeClass[] = [];
    // const data = [];

    // Iterate through the remaining lines
    for (let i = 1; i < lines.length - 1; i++) {
      const values = lines[i].split(',');
      const obj = new DegreeClass(
        values[0],
        +values[1],
        +values[2],
        +values[3],
      );
      data.push(obj);
    }
    return data;
  }
}
