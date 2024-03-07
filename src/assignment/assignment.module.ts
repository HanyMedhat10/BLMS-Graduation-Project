import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { SubmitAssignment } from './entities/submit_assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, SubmitAssignment])],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
