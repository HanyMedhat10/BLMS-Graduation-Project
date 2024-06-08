import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmitAssignment } from './entities/submit-assignment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { AssignmentService } from 'src/assignment/assignment.service';
import * as fs from 'fs';
@Injectable()
export class SubmitAssignmentService {
  constructor(
    @InjectRepository(SubmitAssignment)
    private readonly submitAssignmentRepository: Repository<SubmitAssignment>,
    private readonly assignmentService: AssignmentService,
  ) {}
  async create(
    assignmentId: number,
    file: Express.Multer.File,
    currentUser: User,
  ): Promise<SubmitAssignment> {
    const assignment = await this.assignmentService.findOne(assignmentId);
    if (!assignment) new NotFoundException('not found assignment');
    const submitAssignment = new SubmitAssignment();
    submitAssignment.assignment = assignment;
    submitAssignment.path = file.filename;
    // submitAssignment.solver = currentUser.student;
    submitAssignment.solver = currentUser;
    return await this.submitAssignmentRepository.save(submitAssignment);
  }

  async findAll(): Promise<SubmitAssignment[]> {
    return await this.submitAssignmentRepository.find({
      relations: {
        assignment: true,
        solver: true,
        correctBy: true,
      },
    });
  }

  async findOne(id: number): Promise<SubmitAssignment> {
    return await this.submitAssignmentRepository.findOne({
      where: { id },
      relations: {
        assignment: true,
        solver: true,
        correctBy: true,
      },
    });
  }
  async findSubmitAssignment(assignmentId: number) {
    return await this.assignmentService.findSubmitAssignment(assignmentId);
  }
  async findSubmitAssignmentStudent(currentUser: User, courseId: number) {
    return await this.submitAssignmentRepository.find({
      where: {
        solver: { id: currentUser.id },
        assignment: { course: { id: courseId } },
      },
      relations: { assignment: true, solver: true },
    });
  }
  async remove(id: number) {
    const assignment = await this.findOne(id);
    try {
      fs.unlinkSync(assignment.path);
    } catch (error) {
      new BadRequestException('Error deleting file');
    }
    return await this.submitAssignmentRepository.delete(id);
  }

  async correctionAssignment(id: number, degree: number, currentUser: User) {
    const submitAssignment = await this.findOne(id);
    if (!submitAssignment) new NotFoundException('not found assignment');
    submitAssignment.degree = degree;
    submitAssignment.correctBy = currentUser;
    return await this.submitAssignmentRepository.save(submitAssignment);
  }
}
