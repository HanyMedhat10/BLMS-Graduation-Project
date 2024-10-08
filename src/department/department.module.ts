import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { College } from 'src/college/entities/college.entity';
import { User } from 'src/auth/entities/user.entity';
import { CollegeModule } from 'src/college/college.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Department, User, College]),
    CollegeModule,
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
