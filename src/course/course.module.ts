import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { DepartmentModule } from 'src/department/department.module';
import { Degree } from './entities/degree.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Degree]), DepartmentModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
