import {
  BadRequestException,
  Injectable,
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
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createAuthDto: CreateUserDto): Promise<User> {
    const userExists = await this.findUserByEmail(createAuthDto.email);
    if (userExists) {
      throw new BadRequestException('Email is not available.');
    }
    createAuthDto.password = await bcrypt.hash(createAuthDto.password, 10);
    let user = this.userRepository.create(createAuthDto);
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
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  async update(
    id: number,
    updateAuthDto: UpdateUserDto,
    currentUser,
  ): Promise<User> {
    const user = await this.findOne(id);
    if (currentUser.id != id) throw new UnauthorizedException();
    Object.assign(user, updateAuthDto);
    return await this.userRepository.save(user);
  }
  async restPassword(id: number): Promise<User> {
    let user = await this.findOne(id);
    user.password = await bcrypt.hash('12345678', 10);
    user = await this.userRepository.save(user);
    user.password = '12345678';
    return user;
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }
}
