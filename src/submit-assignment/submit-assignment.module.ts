import { Module } from '@nestjs/common';
import { SubmitAssignmentService } from './submit-assignment.service';
import { SubmitAssignmentController } from './submit-assignment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmitAssignment } from './entities/submit-assignment.entity';
import { AssignmentModule } from 'src/assignment/assignment.module';

@Module({
  imports: [TypeOrmModule.forFeature([SubmitAssignment]), AssignmentModule],
  controllers: [SubmitAssignmentController],
  providers: [SubmitAssignmentService],
  exports: [SubmitAssignmentService],
})
export class SubmitAssignmentModule {}
