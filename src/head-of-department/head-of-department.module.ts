import { Module } from '@nestjs/common';
import { HeadOfDepartmentService } from './head-of-department.service';
import { HeadOfDepartmentController } from './head-of-department.controller';

@Module({
  controllers: [HeadOfDepartmentController],
  providers: [HeadOfDepartmentService],
})
export class HeadOfDepartmentModule {}
