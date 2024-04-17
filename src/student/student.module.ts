import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/user.entity';
import { CourseModule } from 'src/course/course.module';
import { DepartmentModule } from 'src/department/department.module';
import { Course } from 'src/course/entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Course]),
    AuthModule,
    CourseModule,
    DepartmentModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
