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
import { ApiProperty } from '@nestjs/swagger';
export class CreateStudentUserDto {
  @ApiProperty()
  //   @IsNotEmpty({ message: 'Name can not be null ' })
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
  @IsEnum({ Role, default: Role.STUDENT })
  role: Role;
  @IsPositive()
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 })
  department: number;
  @ApiProperty()
  @IsString({ each: true })
  college: string;
  @ApiProperty()
  @Type(() => UpdateStudentDto)
  @ValidateNested()
  student: UpdateStudentDto;
}
