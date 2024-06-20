import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateStudentUserDto } from './dto/create-student-user-dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UpdateStudentUserDto } from './dto/update-student-user-dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/entities/enum/user.enum';
import { StudentCourses } from './dto/student-courses.dto';
@ApiTags('Student Module')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(
    @Body() createStudentUserDto: CreateStudentUserDto,
    @CurrentUser() currentUser: User,
  ): Promise<User> {
    return this.studentService.create(createStudentUserDto, currentUser);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('addStudyCourse/:id')
  addStudyCourse(
    @Param('id') id: string,
    @Body() courses: StudentCourses,
  ): Promise<User> {
    return this.studentService.addStudyCourse(+id, courses);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.studentService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }
  @ApiBearerAuth()
  // @Roles(Role.STUDENT)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('getAllGradesInCourse/:id')
  async getAllGradesInCourse(
    @Param('id') id: string,
    @CurrentUser() currentUser: User,
  ) {
    // console.log(currentUser);
    return await this.studentService.getAllGradesInCourse(currentUser, +id);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentUserDto: UpdateStudentUserDto,
    @CurrentUser() currentUser: User,
  ): Promise<User> {
    return this.studentService.updateStudent(
      +id,
      updateStudentUserDto,
      currentUser,
    );
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.CLERK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('deleteCourse/:id')
  removeCourse(@Param('id') id: string, @Body() courses: StudentCourses) {
    return this.studentService.removeCourse(+id, courses);
  }
}
