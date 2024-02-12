import { Injectable } from '@nestjs/common';
import { CreateHeadOfDepartmentDto } from './dto/create-head-of-department.dto';
import { UpdateHeadOfDepartmentDto } from './dto/update-head-of-department.dto';

@Injectable()
export class HeadOfDepartmentService {
  create(createHeadOfDepartmentDto: CreateHeadOfDepartmentDto) {
    return 'This action adds a new headOfDepartment';
  }

  findAll() {
    return `This action returns all headOfDepartment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} headOfDepartment`;
  }

  update(id: number, updateHeadOfDepartmentDto: UpdateHeadOfDepartmentDto) {
    return `This action updates a #${id} headOfDepartment`;
  }

  remove(id: number) {
    return `This action removes a #${id} headOfDepartment`;
  }
}
