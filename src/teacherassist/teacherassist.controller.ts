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
import { TeacherassistService } from './teacherassist.service';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateTeacherAssistUserDto } from './dto/create-teacherassist-user.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { UpdateTeacherAssistUserDto } from './dto/update-teacherassist-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DoctorService } from 'src/doctor/doctor.service';
@ApiTags('Teacher Assist Module')
@Controller('teacherassist')
export class TeacherassistController {
  constructor(
    private readonly teacherassistService: TeacherassistService,
    private readonly doctorService: DoctorService,
  ) {}
  @ApiBearerAuth()
  @Roles('admin', 'clerk')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(
    @Body() createTeacherassistDto: CreateTeacherAssistUserDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.teacherassistService.create(
      createTeacherassistDto,
      currentUser,
    );
  }
  @ApiBearerAuth()
  @Roles('admin', 'clerk')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('addStudyCourse/:id')
  addStudyCourse(
    @Param('id') id: string,
    @Query('courseId') courseId: string,
  ): Promise<User> {
    return this.teacherassistService.addStudyCourse(+id, +courseId);
  }
  @Roles('admin', 'clerk')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('addTeachingCourse/:id')
  addTeachingCourse(
    @Param('id') id: string,
    @Query('courseId') courseId: string,
  ): Promise<User> {
    return this.doctorService.addStudyCourse(+id, +courseId);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.teacherassistService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherassistService.findOne(+id);
  }
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeacherassistDto: UpdateTeacherAssistUserDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.teacherassistService.update(
      +id,
      updateTeacherassistDto,
      currentUser,
    );
  }
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherassistService.remove(+id);
  }
  @ApiBearerAuth()
  @Roles('admin', 'clerk')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('deleteStudyCourse/:id')
  removeStudyCourse(
    @Param('id') id: string,
    @Query('courseId') courseId: string,
  ) {
    return this.teacherassistService.removeCourse(+id, +courseId);
  }
  @ApiBearerAuth()
  @Roles('admin', 'clerk')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('deleteTeachingCourse/:id')
  removeTeachingCourse(
    @Param('id') id: string,
    @Query('courseId') courseId: string,
  ) {
    return this.doctorService.removeCourse(+id, +courseId);
  }
}
