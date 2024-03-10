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
  async create(
    createAssignmentDto: CreateAssignmentDto,
    file: Express.Multer.File,
  ): Promise<Assignment> {
    const assignment = new Assignment();
    assignment.path = file.path;
    Object.assign(assignment, createAssignmentDto);
    return await this.assignmentRepository.save(assignment);
  }

  async findAll(): Promise<Assignment[]> {
    return await this.assignmentRepository.find();
  }

  async findOne(id: number): Promise<Assignment> {
    return await this.assignmentRepository.findOne({ where: { id } });
  }

  async update(
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
