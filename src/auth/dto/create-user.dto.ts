import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsInt,
  Min,
} from 'class-validator';
import { Role } from '../entities/enum/user.enum';

export class CreateUserDto {
  //   @IsNotEmpty({ message: 'Name can not be null ' })
  //   @IsString({ message: 'Name should be string ' })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  //   @IsEmail({}, { message: 'Please provide a validator email' })
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  //   @MinLength(8, { message: 'Password minimum character should be 8.' })
  @MinLength(8)
  @IsString()
  password: string;
  //   @IsNotEmpty()
  //   @IsEnum({ Role })
  role: Role;
  @ApiProperty()
  @IsInt()
  @Min(1)
  college: number;
}
