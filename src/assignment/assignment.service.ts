import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { CourseService } from 'src/course/course.service';
@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    private readonly courseService: CourseService,
  ) {}
  async create(
    createAssignmentDto: CreateAssignmentDto,
    file: Express.Multer.File,
  ): Promise<Assignment> {
    const assignment = new Assignment();
    assignment.path = file.path;
    Object.assign(assignment, createAssignmentDto);
    const course = await this.courseService.findOne(
      createAssignmentDto.courseId,
    );
    if (course) assignment.course = course;
    else new NotFoundException('Not found Course');
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
  ): Promise<Assignment> {
    const assignment = await this.findOne(id);
    if (file != null) {
      try {
        fs.unlinkSync(assignment.path);
      } catch (error) {
        new BadRequestException('Error deleting file');
      }
      assignment.path = file.path;
    }
    Object.assign(assignment, updateAssignmentDto);
    const courseId = updateAssignmentDto.courseId;
    if (!courseId) {
      const course = await this.courseService.findOne(courseId);
      if (course) assignment.course = course;
    }
    return await this.assignmentRepository.save(assignment);
  }

  remove(id: number) {
    return `This action removes a #${id} assignment`;
  }
}
