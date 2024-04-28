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
import { User } from 'src/auth/entities/user.entity';
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
    currentUser: User,
  ): Promise<Assignment> {
    const assignment = new Assignment();
    assignment.path = file.filename;
    Object.assign(assignment, createAssignmentDto);
    const course = await this.courseService.findOne(
      createAssignmentDto.courseId,
    );
    if (course) assignment.course = course;
    else new NotFoundException('Not found Course');
    assignment.createBy = currentUser;
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
      assignment.path = file.filename;
    }
    Object.assign(assignment, updateAssignmentDto);
    const courseId = updateAssignmentDto.courseId;
    if (!courseId) {
      const course = await this.courseService.findOne(courseId);
      if (course) assignment.course = course;
    }
    return await this.assignmentRepository.save(assignment);
  }

  async remove(id: number) {
    const assignment = await this.findOne(id);
    try {
      fs.unlinkSync(assignment.path);
    } catch (error) {
      new BadRequestException('Error deleting file');
    }
    return await this.assignmentRepository.delete(id);
  }
}
