import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { UpdateTeacherassistDto } from './update-teacherassist.dto';
import { Type } from 'class-transformer';
import { Role } from 'src/auth/entities/enum/user.enum';

export class CreateTeacherAssistUserDto {
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
  @IsEnum({ Role, default: Role.TA })
  role: Role;
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 0 })
  department: number;
  @IsString({ each: true })
  college: string;
  @IsNumber({}, { each: true })
  teachingCourses: number[];
  @Type(() => UpdateTeacherassistDto)
  @ValidateNested()
  teacherAssistant: UpdateTeacherassistDto;
}
