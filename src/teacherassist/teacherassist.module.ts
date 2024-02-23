import { Module } from '@nestjs/common';
import { TeacherassistService } from './teacherassist.service';
import { TeacherassistController } from './teacherassist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherAssistant } from './entities/teacherassist.entity';
import { User } from 'src/auth/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CourseModule } from 'src/course/course.module';
import { DepartmentModule } from 'src/department/department.module';
import { Course } from 'src/course/entities/course.entity';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherAssistant, User, Course]),
    AuthModule,
    CourseModule,
    DepartmentModule,
    DoctorModule,
  ],
  controllers: [TeacherassistController],
  providers: [TeacherassistService],
  exports: [TeacherassistService],
})
export class TeacherassistModule {}
