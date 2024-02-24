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
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
@ApiTags('Course Module')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Roles('admin', 'clerk')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.courseService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }
  @Roles('admin')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }
  @Roles('admin')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
