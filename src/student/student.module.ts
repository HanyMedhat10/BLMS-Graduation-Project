import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/user.entity';
import { CourseModule } from 'src/course/course.module';
import { DepartmentModule } from 'src/department/department.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, User]),
    AuthModule,
    CourseModule,
    DepartmentModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
