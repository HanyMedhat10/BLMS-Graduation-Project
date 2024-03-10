import { Injectable } from '@nestjs/common';
import { CreateSubmitAssignmentDto } from './dto/create-submit-assignment.dto';
import { UpdateSubmitAssignmentDto } from './dto/update-submit-assignment.dto';

@Injectable()
export class SubmitAssignmentService {
  create(createSubmitAssignmentDto: CreateSubmitAssignmentDto) {
    return 'This action adds a new submitAssignment';
  }

  findAll() {
    return `This action returns all submitAssignment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} submitAssignment`;
  }

  update(id: number, updateSubmitAssignmentDto: UpdateSubmitAssignmentDto) {
    return `This action updates a #${id} submitAssignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} submitAssignment`;
  }
}
