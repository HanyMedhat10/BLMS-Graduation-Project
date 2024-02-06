import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { College } from 'src/college/entities/college.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, User, College])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
