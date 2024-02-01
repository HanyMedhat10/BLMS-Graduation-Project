import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../entities/enum/user.enum';

export class CreateUserDto {
  //   @IsNotEmpty({ message: 'Name can not be null ' })
  //   @IsString({ message: 'Name should be string ' })
  @IsNotEmpty()
  @IsString()
  name: string;
  //   @IsEmail({}, { message: 'Please provide a validator email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  //   @MinLength(8, { message: 'Password minimum character should be 8.' })
  @MinLength(8)
  @IsString()
  password: string;
  //   @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
