import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeadOfDepartmentDto } from './dto/create-head-of-department.dto';
import { UpdateHeadOfDepartmentDto } from './dto/update-head-of-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Role } from 'src/auth/entities/enum/user.enum';

@Injectable()
export class HeadOfDepartmentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(
    createHeadOfDepartmentDto: CreateHeadOfDepartmentDto,
    currentUser: User,
  ) {
    return 'This action adds a new headOfDepartment';
  }

  async findAll() {
    return await this.userRepository.find({
      where: { role: Role.HOfDE },
      relations: {
        department: true,
        college: true,
        teachingCourses: true,
      },
    });
  }

  async findOne(id: number) {
    const hod = await this.userRepository.findOne({
      where: { id: id, role: Role.HOfDE },
      relations: {
        department: true,
        college: true,
        teachingCourses: true,
      },
    });
    if (!hod) throw new NotFoundException('Head Of Department not found');
    return hod;
  }

  update(id: number, updateHeadOfDepartmentDto: UpdateHeadOfDepartmentDto) {
    return `This action updates a #${id} headOfDepartment`;
  }

  async remove(id: number) {
    const hod = await this.findOne(id);
    return await this.userRepository.delete(hod.id);
  }
}
