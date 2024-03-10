import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSubmitAssignmentDto } from './dto/update-submit-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmitAssignment } from './entities/submit-assignment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { AssignmentService } from 'src/assignment/assignment.service';

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
    submitAssignment.path = file.path;
    submitAssignment.solver = currentUser;
    return await this.submitAssignmentRepository.save(submitAssignment);
  }

  async findAll(): Promise<SubmitAssignment[]> {
    return await this.submitAssignmentRepository.find();
  }

  async findOne(id: number): Promise<SubmitAssignment> {
    return await this.submitAssignmentRepository.findOne({ where: { id } });
  }

  update(id: number, updateSubmitAssignmentDto: UpdateSubmitAssignmentDto) {
    return `This action updates a #${id} submitAssignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} submitAssignment`;
  }
}
