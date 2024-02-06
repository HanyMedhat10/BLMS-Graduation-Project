import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { College } from './entities/college.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Role } from 'src/auth/entities/enum/user.enum';

@Injectable()
export class CollegeService {
  constructor(
    @InjectRepository(College)
    private readonly collegeRepository: Repository<College>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createCollegeDto: CreateCollegeDto): Promise<College> {
    const college = await this.collegeRepository.findOne({
      where: { name: createCollegeDto.name },
    });
    if (college) {
      throw new BadRequestException('the name is not available.');
    }
    const dean = await this.userRepository.findOne({
      where: { email: createCollegeDto.DeanOfCollege, role: Role.ADMIN },
    });
    const newCollege = new College();
    newCollege.name = createCollegeDto.name;
    newCollege.DeanOfCollege = dean;
    return await this.collegeRepository.save(newCollege);
  }

  async findAll(): Promise<College[]> {
    return await this.collegeRepository.find({
      relations: { DeanOfCollege: true },
    });
  }

  async findOne(id: number): Promise<College> {
    return await this.collegeRepository.findOne({
      where: { id },
      relations: { DeanOfCollege: true },
    });
  }
  async findOneByName(name: string): Promise<College> {
    return await this.collegeRepository.findOne({
      where: { name },
    });
  }

  async update(
    id: number,
    updateCollegeDto: UpdateCollegeDto,
  ): Promise<College> {
    const college = await this.collegeRepository.findOne({
      where: { id },
    });
    const collegeDuplicate = await this.collegeRepository.findOne({
      where: { name: updateCollegeDto.name },
    });
    if (collegeDuplicate) {
      throw new BadRequestException('the name is not available.');
    }
    if (updateCollegeDto.DeanOfCollege != null) {
      const dean = await this.userRepository.findOne({
        where: { email: updateCollegeDto.DeanOfCollege, role: Role.ADMIN },
      });
      college.name = updateCollegeDto.name;
      college.DeanOfCollege = dean;
      return await this.collegeRepository.save(college);
    }
    college.name = updateCollegeDto.name;
    return await this.collegeRepository.save(college);

    //return `This action removes a #${name} college`;
  }

  async remove(id: number) {
    return await this.collegeRepository.delete(id);
    return `This action removes a #${name} college`;
  }
}
