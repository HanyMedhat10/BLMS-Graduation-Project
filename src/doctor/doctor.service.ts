import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/auth/entities/enum/user.enum';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: AuthService,
  ) {}
  async create(createDoctorDto: CreateDoctorDto, currentUser: User) {
    return await this.userService.createDR(createDoctorDto, currentUser);
  }

  async findAll() {
    return await this.userRepository.find({
      where: { role: Role.DR },
      relations: {
        department: true,
        college: true,
        teachingCourses: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id, role: Role.DR },
      relations: {
        department: true,
        college: true,
        teachingCourses: true,
      },
    });
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  async remove(id: number) {
    const doctor = await this.findOne(id);
    // if (doctor.teachingCourses != null) {
    //   throw new BadRequestException('The Doctor teaching courses');
    // }
    return await this.userRepository.delete(doctor.id);
  }
}
