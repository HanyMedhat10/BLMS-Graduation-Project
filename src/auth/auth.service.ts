import { Student } from 'src/student/entities/student.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserLoginDto } from './dto/user-login.dto';
import { ChangePasswordDto } from './dto/change-password-user.dto';
import { Role } from './entities/enum/user.enum';
import { StudentType } from 'src/student/entities/enum/student.enum';
import { College } from '../college/entities/college.entity';
import { CreateCollegeDto } from '../college/dto/create-college.dto';
import { CourseService } from 'src/course/course.service';
import { Department } from 'src/department/entities/department.entity';
import { CreateStudentUserDto } from 'src/student/dto/create-student-user-dto';
import { TeacherAssistant } from 'src/teacherassist/entities/teacherassist.entity';
import { TeacherType } from 'src/teacherassist/entities/enum/teacher.enum';
import { CreateTeacherAssistUserDto } from 'src/teacherassist/dto/create-teacherassist-user.dto';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(College)
    private readonly collegeRepository: Repository<College>,
    private readonly courseService: CourseService,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(TeacherAssistant)
    private readonly teacherAssistantRepository: Repository<TeacherAssistant>,
  ) {}
  async create(createAuthDto: CreateUserDto, currentUser: User): Promise<User> {
    const userExists = await this.findUserByEmail(createAuthDto.email);
    if (userExists) {
      throw new BadRequestException('Email is not available.');
    }
    switch (createAuthDto.role) {
      case Role.ADMIN:
        return await this.createUser(createAuthDto, currentUser);
        // case Role.STUDENT:
        //   return await this.createStudent(createAuthDto, currentUser);
        // case Role.TA:
        //   return await this.createTA(createAuthDto, currentUser);

        break;
      default:
        console.log('default state');
        console.log(createAuthDto);
        throw new NotFoundException();
        break;
    }
    return await this.createUser(createAuthDto, currentUser);
  }

  async createTA(
    createTeacherassistDto: CreateTeacherAssistUserDto,
    currentUser: User,
  ) {
    const userExists = await this.findUserByEmail(createTeacherassistDto.email);
    if (userExists) {
      throw new BadRequestException('Email is not available.');
    }
    const userTA = createTeacherassistDto.teacherAssistant;
    let ta = new TeacherAssistant();
    Object.assign(ta, userTA);
    if (
      userTA.courses != null &&
      userTA.teacherType == TeacherType.STUDYMASTER
    ) {
      const courses = await Promise.all(
        userTA.courses.map((x) => this.courseService.findOne(x)),
      );
      ta.courses = courses;
    }

    ta = await this.teacherAssistantRepository.save(ta);
    createTeacherassistDto.password = await bcrypt.hash(
      createTeacherassistDto.password,
      10,
    );
    const college = await this.preloadCollegeByName(
      createTeacherassistDto.college,
    );
    const department = await this.departmentRepository.findOne({
      where: { id: createTeacherassistDto.department },
    });
    const coursesTeaching = await Promise.all(
      createTeacherassistDto.teachingCourses.map((x) =>
        this.courseService.findOne(x),
      ),
    );
    let user = await this.userRepository.create({
      ...createTeacherassistDto,
      teacherAssistant: ta,
      college,
      department: department,
      teachingCourses: coursesTeaching,
    });
    user.addedBy = currentUser;
    user = await this.userRepository.save(user);
    delete user.password;
    return user;
  }
  async createDR(createDoctorDto: CreateDoctorDto, currentUser: User) {
    const userExists = await this.findUserByEmail(createDoctorDto.email);
    if (userExists) {
      throw new BadRequestException('Email is not available.');
    }
    const courses = await Promise.all(
      createDoctorDto.teachingCourses.map((x) => this.courseService.findOne(x)),
    );
    createDoctorDto.password = await bcrypt.hash(createDoctorDto.password, 10);
    const college = await this.preloadCollegeByName(createDoctorDto.college);
    const department = await this.departmentRepository.findOne({
      where: { id: createDoctorDto.department },
    });
    let normalUser = new User();
    normalUser = Object.assign(normalUser, createDoctorDto);
    normalUser.college = college;
    normalUser.teachingCourses = courses;
    normalUser.department = department;
    normalUser.addedBy = currentUser;
    normalUser = await this.userRepository.save(normalUser);
    delete normalUser.password;
    return normalUser;
  }

  private async createUser(createAuthDto: CreateUserDto, currentUser: User) {
    createAuthDto.password = await bcrypt.hash(createAuthDto.password, 10);
    const college = await this.preloadCollegeByName(createAuthDto.college);
    let normalUser = new User();
    normalUser = Object.assign(normalUser, createAuthDto);
    normalUser.college = college;
    normalUser.addedBy = currentUser;
    normalUser = await this.userRepository.save(normalUser);
    delete normalUser.password;
    return normalUser;
  }

  async findOneUser(id: number, role: Role) {
    switch (role) {
      case Role.STUDENT:
        const user = await this.userRepository.findOne({
          where: { id: id, role: role },
          relations: { student: true },
        });
        if (!user) throw new NotFoundException(`Student Not Found`);
        return user;
      // case Role.DR:
      //   const user = await this.userRepository.findOne({
      //     where: { id: id, role: role },
      //     relations: { doctor: true },
      //   });
      //   if (!user) throw new NotFoundException(`Doctor Not Found`);
      //   return user;
      // case Role.HOfDE:
      //   const user = await this.userRepository.findOne({
      //     where: { id: id, role: role },
      //     relations: { hOfDe: true },
      //   });
      //   if (!user) throw new NotFoundException(`Head of Department Not Found`);
      //   return user;

      default:
        break;
    }
  }
  async createStudent(
    createStudentUserDto: CreateStudentUserDto,
    currentUser: User,
  ): Promise<User> {
    const userExists = await this.findUserByEmail(createStudentUserDto.email);
    if (userExists) {
      throw new BadRequestException('Email is not available.');
    }
    const userObject = createStudentUserDto.student;
    if (
      (userObject.studentType == StudentType.UNDERGRADUATE &&
        userObject.classes != null) ||
      (userObject.studentType == StudentType.POSTGRADUATE &&
        userObject.degreeProgram != null)
    ) {
      const courses = await Promise.all(
        createStudentUserDto.student.courses.map((x) =>
          this.courseService.findOne(x),
        ),
      );
      let student = await this.studentRepository.create({
        ...createStudentUserDto.student,
        courses,
      });
      student = await this.studentRepository.save(student);
      // createAuthDto.student = student;
      createStudentUserDto.password = await bcrypt.hash(
        createStudentUserDto.password,
        10,
      );
      const college = await this.preloadCollegeByName(
        createStudentUserDto.college,
      );
      const department = await this.departmentRepository.findOne({
        where: { id: createStudentUserDto.department },
      });
      let user = await this.userRepository.create({
        ...createStudentUserDto,
        student,
        college,
        department: department,
        // teacherAssistant:null,
      });
      user.addedBy = currentUser;
      user = await this.userRepository.save(user);
      delete user.password;
      return user;
    }
    throw new NotFoundException(
      'student Type is Under Graduate you must entry classes data or student type is postGraduate you must entry degree program',
    );
  }
  async login(userLoginDto: UserLoginDto) {
    // const userExists = await this.findUserByEmail(userLoginDto.email);
    const userExists = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userLoginDto.email })
      .getOne();
    if (!userExists) {
      // throw new BadRequestException('Email or Password is incorrect.');
      throw new UnauthorizedException();
    }
    const matchPassword = await bcrypt.compare(
      userLoginDto.password,
      userExists.password,
    );
    if (!matchPassword) {
      // throw new BadRequestException('Email or Password is incorrect.');
      throw new UnauthorizedException();
    }

    delete userExists.password;
    const token = sign({ ...userExists }, 'secrete');
    return { token, userExists };
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: {
        addedBy: {
          email: true,
        },
        college: {
          id: true,
          name: true,
          DeanOfCollege: {
            email: true,
            name: true,
          },
        },
      },
      relations: { addedBy: true, student: true },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        addedBy: {
          email: true,
        },
        college: {
          id: true,
          name: true,
          DeanOfCollege: {
            email: true,
            name: true,
          },
        },
      },
      relations: { addedBy: true, student: true },
    });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  async update(
    id: number,
    updateAuthDto: UpdateUserDto,
    currentUser,
  ): Promise<User> {
    const college = await this.preloadCollegeByName(updateAuthDto.college);
    const user = await this.findOne(id);
    delete updateAuthDto.password;
    Object.assign(user, updateAuthDto);
    user.addedBy = currentUser;
    user.college = college;
    return await this.userRepository.save(user);
  }

  async restPassword(id: number): Promise<User> {
    const user = await this.findOne(id);
    return this.updatePassword(user);
  }

  // async changePassword(
  //   id: number,
  //   oldPassword: string,
  //   newPassword: string,
  // ): Promise<User> {
  //   let user = await this.findOne(id);
  //   const matchPassword = await bcrypt.compare(user.password, oldPassword);
  //   if (!matchPassword) {
  //     // throw new BadRequestException('Email or Password is incorrect.');
  //     throw new UnauthorizedException();
  //   }
  //   user.password = await bcrypt.hash(newPassword, 10);
  //   user = await this.userRepository.save(user);
  //   user.password = newPassword;
  //   return user;
  // }
  async changePassword(
    currentUser: User,
    changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: currentUser.email })
      .getOne();
    const matchPassword = await bcrypt.compare(
      changePasswordDto.oldPassword,
      user.password,
    );
    if (!matchPassword) {
      // throw new BadRequestException('Email or Password is incorrect.');
      throw new UnauthorizedException();
    }
    return await this.updatePassword(user, changePasswordDto.newPassword);
  }
  async updatePassword(
    user: User,
    newPassword: string = '12345678',
  ): Promise<User> {
    user.password = await bcrypt.hash(newPassword, 10);
    user = await this.userRepository.save(user);
    user.password = newPassword;
    return user;
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }
  async preloadCollegeByName(name: string): Promise<College> {
    const college = await this.collegeRepository.findOne({ where: { name } });
    if (college) {
      return college;
    }
    return this.collegeRepository.create({ name });
  }
  async addCollege(createCollege: CreateCollegeDto): Promise<College> {
    const college = await this.collegeRepository.findOne({
      where: { name: createCollege.name },
    });

    if (college) {
      throw new BadRequestException('the name is not available.');
    }
    const dean = await this.userRepository.findOne({
      where: { email: createCollege.DeanOfCollege, role: Role.ADMIN },
    });
    const newCollege = new College();
    newCollege.name = createCollege.name;
    newCollege.DeanOfCollege = dean;
    return await this.collegeRepository.create(newCollege);
  }
  async addDeanOfCollegeByName(name: string, id: number): Promise<College> {
    const college = await this.collegeRepository.findOne({ where: { name } });
    const dean = await this.userRepository.findOne({
      where: { id, role: Role.ADMIN },
    });
    if (!dean) throw new NotFoundException('Not found dean');
    if (college) {
      college.DeanOfCollege = dean;
      return await this.collegeRepository.save(college);
    } else {
      college.name = name;
      college.DeanOfCollege = dean;
      return await this.collegeRepository.create(college);
    }
  }
  async editCollege(oldName: string, newName: string): Promise<College> {
    const college = await this.collegeRepository.findOne({
      where: { name: oldName },
    });
    const collegeDuplicate = await this.collegeRepository.findOne({
      where: { name: newName },
    });
    if (!collegeDuplicate) {
      college.name = newName;
      return await this.collegeRepository.save(college);
    }
    throw new BadRequestException('the name is not available.');
    //return `This action removes a #${name} college`;
  }
  async deleteCollegeByName(name: string): Promise<string> {
    const college = await this.collegeRepository.findOne({ where: { name } });
    await this.collegeRepository.delete(college.id);
    return `This action removes a #${name} college`;
  }
}
