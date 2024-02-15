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
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Student Module')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(
    @Body() createStudentUserDto: CreateStudentUserDto,
    @CurrentUser() currentUser: User,
  ): Promise<User> {
    return this.studentService.create(createStudentUserDto, currentUser);
  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.studentService.findAll();
  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentUserDto: UpdateStudentUserDto,
    @CurrentUser() currentUser: User,
  ): Promise<User> {
    return this.studentService.update(+id, updateStudentUserDto, currentUser);
  }
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
