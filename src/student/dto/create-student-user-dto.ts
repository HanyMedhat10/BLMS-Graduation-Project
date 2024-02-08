import { Role } from '../../auth/entities/enum/user.enum';
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
import { UpdateStudentDto } from './update-student.dto';
import { Type } from 'class-transformer';
export class CreateStudentUserDto {
  //   @IsNotEmpty({ message: 'Name can not be null ' })
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
  @IsEnum({ Role, default: Role.STUDENT })
  role: Role;
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 0 })
  department: number;
  @IsString({ each: true })
  college: string;
  @Type(() => UpdateStudentDto)
  @ValidateNested()
  student: UpdateStudentDto;
}
