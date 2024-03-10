import { Module } from '@nestjs/common';
import { SubmitAssignmentService } from './submit-assignment.service';
import { SubmitAssignmentController } from './submit-assignment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmitAssignment } from './entities/submit-assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubmitAssignment])],
  controllers: [SubmitAssignmentController],
  providers: [SubmitAssignmentService],
})
export class SubmitAssignmentModule {}
