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
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  async update(
    id: number,
    updateAuthDto: UpdateUserDto,
    currentUser,
  ): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.id=:id', { id: id })
      .getOne();
    // if (currentUser.id != id) throw new UnauthorizedException();
    if (updateAuthDto.password == null) {
      console.log(updateAuthDto.password);
      console.log('the password is null');
      Object.assign(user, updateAuthDto);
      return await this.userRepository.save(user);
    }
    Object.assign(user, updateAuthDto);
    return this.updatePassword(user, updateAuthDto.password);
    // } else {
    //   const len = updateAuthDto.password.length;
    //   console.log('the password is not  null ' + len);
    //   if (!length(updateAuthDto.password, 8)) {
    //     throw new BadRequestException(
    //       'password must be longer than or equal to 8 characters',
    //     );
    //   }
    //   console.log(updateAuthDto.password);
   
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
