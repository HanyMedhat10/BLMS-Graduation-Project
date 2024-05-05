import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/auth/entities/enum/user.enum';
import { User } from 'src/auth/entities/user.entity';
import { CreateStudentUserDto } from './dto/create-student-user-dto';
import { UpdateStudentUserDto } from './dto/update-student-user-dto';
import { CourseService } from 'src/course/course.service';
import { DepartmentService } from 'src/department/department.service';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class StudentService {
  constructor(
    // @InjectRepository(Student)
    // private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly userService: AuthService,
    private readonly courseService: CourseService,
    private readonly departmentService: DepartmentService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createStudentUserDto: CreateStudentUserDto, currentUser: User) {
    return await this.userService.createStudent(
      createStudentUserDto,
      currentUser,
    );
  }
  async addStudyCourse(id: number, courseId: number): Promise<User> {
    const student = await this.findOne(id);
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });
    // await student.student.courses.push(course);
    await student.courses.push(course);
    await this.userRepository.save(student);
    // await this.studentRepository.save(student.student);
    return await this.findOne(id);
  }
  async findAll() {
    // return await this.studentRepository.find({ relations: { user: true } });
    return await this.userRepository.find({
      where: { role: Role.STUDENT },
      // relations: { student: { courses: true } },
      relations: { courses: true },
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
      // select: { password: false },
      // relations: { student: { courses: true }, addedBy: true, college: true },
      relations: { courses: true, addedBy: true, college: true },
    });
    if (!user) throw new NotFoundException(`the student Not Found`);
    return user;
  }

  // async update(
  //   id: number,
  //   updateStudentUserDto: UpdateStudentUserDto,
  //   currentUser: User,
  // ) {
  //   // let user = await this.findOne(id);
  //   // let student = await this.studentRepository.findOne(user.student.id as any);
  //   // student = Object.assign(student, updateStudentUserDto.student);
  //   // student = await this.studentRepository.save(student);
  //   // user = Object.assign(user, updateStudentUserDto);
  //   // user.student = student;
  //   // user.addedBy = currentUser;
  //   // return await this.userRepository.save(user);
  //   // let student = await this.studentRepository.findOne({
  //   //   where: { user: { id: id } },
  //   // });
  //   let student = await this.userRepository.findOne({
  //     where: { id: id, role: Role.STUDENT },
  //   });
  //   // if (updateStudentUserDto.student != null) {
  //   if (updateStudentUserDto.courses != null) {
  //     const courses = await Promise.all(
  //       updateStudentUserDto.courses.map((x) => this.courseService.findOne(x)),
  //     );
  //     // student = await this.studentRepository.preload({
  //     //   id: student.id, // if id is string , we should id:+id to convert number
  //     //   ...updateStudentUserDto.student,
  //     //   courses,
  //     // });
  //     // student = await this.userRepository.preload({
  //     //   // id:id, // if id is string , we should id:+id to convert number
  //     //   ...updateStudentUserDto,
  //     //   courses,
  //     // });
  //   } else Object.assign(student, updateStudentUserDto);
  //   // }
  //   if (!student) {
  //     throw new NotFoundException(`This id: ${id} not found `);
  //   }

  //   student = await this.userRepository.save(student);
  //   const college = await this.userService.preloadCollegeById(
  //     updateStudentUserDto.college,
  //   );
  //   const user = await this.findOne(id);
  //   // await this.userRepository.preload({
  //   //   id: +id, // if id is string , we should id:+id to convert number
  //   //   ...updateStudentUserDto,
  //   //   student: student,
  //   //   college,
  //   // });
  //   delete updateStudentUserDto.password;
  //   Object.assign(user, updateStudentUserDto);
  //   // user.student = student;
  //   user.addedBy = currentUser;
  //   user.college = college;
  //   user.courses = courses;
  //   if (updateStudentUserDto.department != null) {
  //     const department = await this.departmentService.findOne(
  //       updateStudentUserDto.department,
  //     );
  //     user.department = department;
  //   }
  //   return await this.userRepository.save(user);
  //   // const student = await this.findOne(id);

  //   // return await this.userService.update(id, updateStudentUserDto, currentUser);
  // }

  async updateStudent(
    id: number,
    updateStudentUserDto: UpdateStudentUserDto,
    currentUser: User,
  ) {
    const college = await this.userService.preloadCollegeById(
      updateStudentUserDto.college,
    );
    const user = await this.findOne(id);
    delete updateStudentUserDto.password;
    Object.assign(user, updateStudentUserDto);
    // user.teacherAssistant = teacherAssistant;
    user.addedBy = currentUser;
    user.college = college;
    if (updateStudentUserDto.courses != null) {
      const courses = await Promise.all(
        updateStudentUserDto.courses.map((x) => this.courseService.findOne(x)),
      );
      user.courses = courses;
    }
    if (updateStudentUserDto.department != null) {
      const department = await this.departmentService.findOne(
        updateStudentUserDto.department,
      );
      user.department = department;
    }
    return await this.userRepository.save(user);
  }
  async getAllGradesInCourse(currentUser: User, courseId: number) {
    return await this.userRepository.findOne({
      where: {
        id: currentUser.id,
        // role: Role.STUDENT,
        // courses: { id: courseId },
        submitQuizzes: { quiz: { course: { id: courseId } } },
        submitsAssignments: { assignment: { course: { id: courseId } } },
      },
      relations: {
        submitQuizzes: { quiz: true },
        submitsAssignments: { assignment: true },
      },
      select: {
        submitQuizzes: {
          degree: true,
          quiz: {
            title: true,
          },
        },
        submitsAssignments: { degree: true, assignment: { title: true } },
      },
    });
  }
  async remove(id: number) {
    // const student = await this.findOne(id);
    // await this.studentRepository.delete(student.student.id);
    return await this.userService.remove(id);
  }
  async removeCourse(id: number, courseId: number) {
    const student = await this.findOne(id);
    student.courses = student.courses.filter((course) => {
      return course.id !== courseId;
    });
    await this.userRepository.save(student);
    return await this.findOne(id);
    // return await this.studentRepository.save(student);
  }
}
