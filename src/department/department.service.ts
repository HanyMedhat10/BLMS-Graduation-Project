import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { CollegeService } from 'src/college/college.service';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    private readonly collegeService: CollegeService,
  ) {}
  async create(createDepartmentDto: CreateDepartmentDto) {
    const college = await this.collegeService.findOneByName(
      createDepartmentDto.college,
    );
    const department = new Department();
    department.college = college;
    department.name = createDepartmentDto.name;
    return await this.departmentRepository.save(department);
  }

  async findAll() {
    return await this.departmentRepository.find({
      relations: { college: true },
    });
  }

  async findOne(id: number) {
    return await this.departmentRepository.findOne({
      where: { id },
      relations: { college: true },
    });
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const nameCollege = updateDepartmentDto.college;
    const department = await this.findOne(id);
    if (nameCollege != null) {
      const college = await this.collegeService.findOneByName(nameCollege);
      department.college = college;
      department.name = updateDepartmentDto.name;
      return await this.departmentRepository.save(department);
    }
    department.name = updateDepartmentDto.name;
    return await this.departmentRepository.save(department);
  }

  remove(id: number) {
    return this.departmentRepository.delete(id);
  }
}
