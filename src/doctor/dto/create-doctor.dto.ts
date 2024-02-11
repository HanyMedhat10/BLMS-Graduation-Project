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
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
  @IsEnum({ Role, default: Role.DR })
  role: Role;
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 0 })
  department: number;
  @IsString({ each: true })
  college: string;
  //   @IsPositive()
  @IsNumber({}, { each: true })
  teachingCourses: number[];
}
