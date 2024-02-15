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

export class CreateHeadOfDepartmentDto {
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
  @IsEnum({ Role, default: Role.HOfDE })
  role: Role;
  @IsPositive()
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 })
  department: number;
  @IsString({ each: true })
  college: string;
  //   @IsPositive()
  @ApiProperty()
  @IsNumber({}, { each: true })
  teachingCourses: number[];
}
