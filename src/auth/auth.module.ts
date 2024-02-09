import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Student } from 'src/student/entities/student.entity';
import { College } from '../college/entities/college.entity';
import { CourseModule } from 'src/course/course.module';
import { Department } from 'src/department/entities/department.entity';
import { TeacherAssistant } from 'src/teacherassist/entities/teacherassist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Student,
      College,
      Department,
      TeacherAssistant,
    ]),
    CourseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
