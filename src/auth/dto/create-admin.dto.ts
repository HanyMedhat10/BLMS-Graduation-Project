import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Role } from '../entities/enum/user.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
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
  @ApiProperty({ enum: ['admin'] })
  @IsEnum({ Role, default: Role.ADMIN })
  role: Role;
  @ApiProperty()
  @IsInt()
  @Min(1)
  college: number;
}
