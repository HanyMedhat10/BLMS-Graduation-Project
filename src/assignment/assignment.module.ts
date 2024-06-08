import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { CourseModule } from 'src/course/course.module';
import { SubmitAssignment } from 'src/submit-assignment/entities/submit-assignment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment, SubmitAssignment]),
    CourseModule,
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService],
  exports: [AssignmentService],
})
export class AssignmentModule {}
