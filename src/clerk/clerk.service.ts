import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClerkDto } from './dto/create-clerk.dto';
import { UpdateClerkDto } from './dto/update-clerk.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/entities/enum/user.enum';
@Injectable()
export class ClerkService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: AuthService,
  ) {}
  async create(createClerkDto: CreateClerkDto, currentUser: User) {
    const userExists = await this.userService.findUserByEmail(
      createClerkDto.email,
    );
    if (userExists) {
      throw new BadRequestException('Email is not available.');
    }
    return await this.createUser(createClerkDto, currentUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: {
        addedBy: {
          email: true,
        },
        college: {
          id: true,
          name: true,
          DeanOfCollege: {
            email: true,
            name: true,
          },
        },
      },
      relations: { addedBy: true },
      where: { role: Role.CLERK },
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      select: {
        addedBy: {
          email: true,
        },
        college: {
          id: true,
          name: true,
          DeanOfCollege: {
            email: true,
            name: true,
          },
        },
      },
      relations: { addedBy: true },
      where: { id, role: Role.CLERK },
    });
  }

  async update(id: number, updateClerkDto: UpdateClerkDto, currentUser: User) {
    const college = await this.userService.preloadCollegeById(
      updateClerkDto.college,
    );
    const user = await this.findOne(id);
    delete updateClerkDto.password;
    Object.assign(user, updateClerkDto);
    user.addedBy = currentUser;
    user.college = college;
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const clerk = await this.findOne(id);
    // if (doctor.teachingCourses != null) {
    //   throw new BadRequestException('The Doctor teaching courses');
    // }
    return await this.userRepository.delete(clerk.id);
  }
  private async createUser(createClerkDto: CreateClerkDto, currentUser: User) {
    createClerkDto.password = await bcrypt.hash(createClerkDto.password, 10);
    const college = await this.userService.preloadCollegeById(
      createClerkDto.college,
    );
    let normalUser = new User();
    normalUser = Object.assign(normalUser, createClerkDto);
    normalUser.college = college;
    normalUser.addedBy = currentUser;
    normalUser = await this.userRepository.save(normalUser);
    delete normalUser.password;
    return normalUser;
  }
}
