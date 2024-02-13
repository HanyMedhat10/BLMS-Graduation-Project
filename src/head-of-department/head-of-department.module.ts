import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { HeadOfDepartmentService } from './head-of-department.service';
import { HeadOfDepartmentController } from './head-of-department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { College } from 'src/college/entities/college.entity';
import { Department } from 'src/department/entities/department.entity';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, College, Department]),
    AuthModule,
    CourseModule,
  ],
  controllers: [HeadOfDepartmentController],
  providers: [HeadOfDepartmentService],
})
export class HeadOfDepartmentModule {}
