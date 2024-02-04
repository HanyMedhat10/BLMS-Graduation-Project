import { Student } from 'src/student/entities/student.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserLoginDto } from './dto/user-login.dto';
import { ChangePasswordDto } from './dto/change-password-user.dto';
import { Role } from './entities/enum/user.enum';
import { StudentType } from 'src/student/entities/enum/student.enum';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}
  async create(createAuthDto: CreateUserDto, currentUser: User): Promise<User> {
    const userExists = await this.findUserByEmail(createAuthDto.email);
    if (userExists) {
      throw new BadRequestException('Email is not available.');
    }
    switch (createAuthDto.role) {
      case Role.ADMIN:
        return await this.createUser(createAuthDto, currentUser);
      case Role.STUDENT:
        const userObject = createAuthDto.student;
        if (
          (userObject.studentType == StudentType.UNDERGRADUATE &&
            userObject.classes != null) ||
          (userObject.studentType == StudentType.POSTGRADUATE &&
            userObject.degreeProgram != null)
        ) {
          const student = await this.studentRepository.save(
            createAuthDto.student,
          );
          createAuthDto.student = student;
          return await this.createUser(createAuthDto, currentUser);
        }
        throw new NotFoundException(
          'student Type is Under Graduate you must entry classes data or student type is postGraduate you must entry degree program',
        );
      default:
        console.log('default state');
        console.log(createAuthDto);
        throw new NotFoundException();
        break;
    }
    return await this.createUser(createAuthDto, currentUser);
  }

  private async createUser(createAuthDto: CreateUserDto, currentUser: User) {
    createAuthDto.password = await bcrypt.hash(createAuthDto.password, 10);
    let user = this.userRepository.create(createAuthDto);
    user.addedBy = currentUser;
    user = await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async login(userLoginDto: UserLoginDto) {
    // const userExists = await this.findUserByEmail(userLoginDto.email);
    const userExists = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userLoginDto.email })
      .getOne();
    if (!userExists) {
      // throw new BadRequestException('Email or Password is incorrect.');
      throw new UnauthorizedException();
    }
    const matchPassword = await bcrypt.compare(
      userLoginDto.password,
      userExists.password,
    );
    if (!matchPassword) {
      // throw new BadRequestException('Email or Password is incorrect.');
      throw new UnauthorizedException();
    }

    delete userExists.password;
    const token = sign({ ...userExists }, 'secrete');
    return { token, userExists };
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: { addedBy: true, student: true },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { addedBy: true, student: true },
    });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  async update(
    id: number,
    updateAuthDto: UpdateUserDto,
    currentUser,
  ): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateAuthDto);
    user.addedBy = currentUser;
    return await this.userRepository.save(user);
  }

  async restPassword(id: number): Promise<User> {
    const user = await this.findOne(id);
    return this.updatePassword(user);
  }

  // async changePassword(
  //   id: number,
  //   oldPassword: string,
  //   newPassword: string,
  // ): Promise<User> {
  //   let user = await this.findOne(id);
  //   const matchPassword = await bcrypt.compare(user.password, oldPassword);
  //   if (!matchPassword) {
  //     // throw new BadRequestException('Email or Password is incorrect.');
  //     throw new UnauthorizedException();
  //   }
  //   user.password = await bcrypt.hash(newPassword, 10);
  //   user = await this.userRepository.save(user);
  //   user.password = newPassword;
  //   return user;
  // }
  async changePassword(
    currentUser: User,
    changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: currentUser.email })
      .getOne();
    const matchPassword = await bcrypt.compare(
      changePasswordDto.oldPassword,
      user.password,
    );
    if (!matchPassword) {
      // throw new BadRequestException('Email or Password is incorrect.');
      throw new UnauthorizedException();
    }
    return await this.updatePassword(user, changePasswordDto.newPassword);
  }
  async updatePassword(
    user: User,
    newPassword: string = '12345678',
  ): Promise<User> {
    user.password = await bcrypt.hash(newPassword, 10);
    user = await this.userRepository.save(user);
    user.password = newPassword;
    return user;
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }
}
