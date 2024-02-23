import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { HeadOfDepartmentService } from './head-of-department.service';
import { HeadOfDepartmentController } from './head-of-department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { College } from 'src/college/entities/college.entity';
import { Department } from 'src/department/entities/department.entity';
import { CourseModule } from 'src/course/course.module';
import { DepartmentModule } from 'src/department/department.module';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, College, Department]),
    AuthModule,
    CourseModule,
    DepartmentModule,
    DoctorModule,
  ],
  controllers: [HeadOfDepartmentController],
  providers: [HeadOfDepartmentService],
  exports: [HeadOfDepartmentService],
})
export class HeadOfDepartmentModule {}
