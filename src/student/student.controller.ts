import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
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
@ApiTags('Student Module')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @ApiBearerAuth()
  @Roles('admin', 'clerk')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(
    @Body() createStudentUserDto: CreateStudentUserDto,
    @CurrentUser() currentUser: User,
  ): Promise<User> {
    return this.studentService.create(createStudentUserDto, currentUser);
  }
  @ApiBearerAuth()
  @Roles('admin', 'clerk')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('addStudyCourse/:id')
  addStudyCourse(
    @Param('id') id: string,
    @Query('courseId') courseId: string,
  ): Promise<User> {
    return this.studentService.addStudyCourse(+id, +courseId);
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
  @Roles('admin')
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
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
  @ApiBearerAuth()
  @Roles('admin', 'clerk')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('deleteCourse/:id')
  removeCourse(@Param('id') id: string, @Query('courseId') courseId: string) {
    return this.studentService.removeCourse(+id, +courseId);
  }
}
