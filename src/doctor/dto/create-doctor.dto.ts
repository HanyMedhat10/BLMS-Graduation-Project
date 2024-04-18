import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Role } from 'src/auth/entities/enum/user.enum';

export class CreateDoctorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
  @ApiProperty({ enum: ['dr'] })
  @IsEnum({ Role, default: Role.DR })
  role: Role;
  @ApiProperty()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 0 })
  department: number;
  @ApiProperty()
  @IsInt()
  @Min(1)
  college: number;
  @ApiProperty()
  // @IsPositive()
  @IsNumber({ maxDecimalPlaces: 0 }, { each: true })
  // @Min(1)
  teachingCourses: number[];
}
