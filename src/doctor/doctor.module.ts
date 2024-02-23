import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { DepartmentModule } from 'src/department/department.module';
import { CourseModule } from 'src/course/course.module';
import { Course } from 'src/course/entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Course]),
    AuthModule,
    DepartmentModule,
    CourseModule,
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}
