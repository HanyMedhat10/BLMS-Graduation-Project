import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
  ) {}
  create(createAssignmentDto: CreateAssignmentDto, file: Express.Multer.File) {
    return 'This action adds a new assignment';
  }

  findAll() {
    return `This action returns all assignment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assignment`;
  }

  update(
    id: number,
    updateAssignmentDto: UpdateAssignmentDto,
    file: Express.Multer.File | null,
  ) {
    return `This action updates a #${id} assignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignment`;
  }
}
