import { Module } from '@nestjs/common';
import { HeadOfDepartmentService } from './head-of-department.service';
import { HeadOfDepartmentController } from './head-of-department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [HeadOfDepartmentController],
  providers: [HeadOfDepartmentService],
})
export class HeadOfDepartmentModule {}
