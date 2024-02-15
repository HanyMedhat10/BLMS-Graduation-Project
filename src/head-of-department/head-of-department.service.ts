import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHeadOfDepartmentDto } from './dto/create-head-of-department.dto';
import { UpdateHeadOfDepartmentDto } from './dto/update-head-of-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Role } from 'src/auth/entities/enum/user.enum';
import { AuthService } from 'src/auth/auth.service';
import { College } from 'src/college/entities/college.entity';
import { Department } from 'src/department/entities/department.entity';
import { CourseService } from 'src/course/course.service';
import * as bcrypt from 'bcrypt';
import { DepartmentService } from 'src/department/department.service';
@Injectable()
export class HeadOfDepartmentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: AuthService,
    @InjectRepository(College)
    private readonly collegeRepository: Repository<College>,
    private readonly courseService: CourseService,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    private readonly departmentService: DepartmentService,
  ) {}

  async create(
    createHeadOfDepartmentDto: CreateHeadOfDepartmentDto,
    currentUser: User,
  ) {
    const userExists = await this.userService.findUserByEmail(
      createHeadOfDepartmentDto.email,
    );
    if (userExists) {
      throw new BadRequestException('Email is not available.');
    }
    const courses = await Promise.all(
      createHeadOfDepartmentDto.teachingCourses.map((x) =>
        this.courseService.findOne(x),
      ),
    );
    createHeadOfDepartmentDto.password = await bcrypt.hash(
      createHeadOfDepartmentDto.password,
      10,
    );
    const college = await this.userService.preloadCollegeByName(
      createHeadOfDepartmentDto.college,
    );
    let department = await this.departmentRepository.findOne({
      where: { id: createHeadOfDepartmentDto.department },
    });
    if (department.headOfDepartment != null)
      throw new BadRequestException(
        `this Department is busy ${JSON.stringify(department)}`,
      );
    let normalUser = new User();
    normalUser = Object.assign(normalUser, createHeadOfDepartmentDto);
    normalUser.college = college;
    normalUser.teachingCourses = courses;
    normalUser.department = department;
    normalUser.addedBy = currentUser;
    normalUser = await this.userRepository.save(normalUser);
    department = this.departmentRepository.create({
      ...department,
      headOfDepartment: normalUser,
    });
    // const departmentNew = new Department();
    // departmentNew.college = department.college;
    // departmentNew.name = department.name;
    // departmentNew.headOfDepartment = normalUser;
    await this.departmentRepository.save(department);
    delete normalUser.password;
    return normalUser;
  }

  async findAll() {
    return await this.userRepository.find({
      where: { role: Role.HOfDE },
      relations: {
        department: true,
        college: true,
        teachingCourses: true,
      },
    });
  }

  async findOne(id: number) {
    const hod = await this.userRepository.findOne({
      where: { id: id, role: Role.HOfDE },
      relations: {
        department: true,
        college: true,
        teachingCourses: true,
      },
    });
    if (!hod) throw new NotFoundException('Head Of Department not found');
    return hod;
  }

  async update(
    id: number,
    updateHeadOfDepartmentDto: UpdateHeadOfDepartmentDto,
    currentUser: User,
  ) {
    const doctor = await this.findOne(id);
    if (!doctor) {
      throw new NotFoundException(`This id: ${id} not found `);
    }

    // doctor = await this.userRepository.save(doctor);
    const college = await this.userService.preloadCollegeByName(
      updateHeadOfDepartmentDto.college,
    );
    // const user = await this.findOne(id);
    delete updateHeadOfDepartmentDto.password;
    Object.assign(doctor, updateHeadOfDepartmentDto);
    doctor.addedBy = currentUser;
    doctor.college = college;
    if (updateHeadOfDepartmentDto.teachingCourses != null) {
      const teachingCourses = await Promise.all(
        updateHeadOfDepartmentDto.teachingCourses.map((x) =>
          this.courseService.findOne(x),
        ),
      );
      doctor.teachingCourses = teachingCourses;
    }
    if (updateHeadOfDepartmentDto.department != null) {
      const department = await this.departmentService.findOne(
        updateHeadOfDepartmentDto.department,
      );
      doctor.department = department;
      if (department.headOfDepartment != null) {
        department.headOfDepartment = doctor;
        await this.departmentRepository.save(department);
      } else
        throw new BadRequestException(
          `this Department is busy ${JSON.stringify(department)}`,
        );
    }
    return await this.userRepository.save(doctor);
  }

  async remove(id: number) {
    const hod = await this.findOne(id);
    return await this.userRepository.delete(hod.id);
  }
}
