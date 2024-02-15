import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/auth/entities/enum/user.enum';

export class CreateDoctorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
  @ApiProperty()
  @IsEnum({ Role, default: Role.DR })
  role: Role;
  @ApiProperty()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 0 })
  department: number;
  @ApiProperty()
  @IsString({ each: true })
  college: string;
  //   @IsPositive()
  @ApiProperty()
  @IsNumber({}, { each: true })
  teachingCourses: number[];
}
