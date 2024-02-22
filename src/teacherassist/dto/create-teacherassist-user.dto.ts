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
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherAssistUserDto {
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
  @ApiProperty({ enum: ['teacher assist'] })
  @IsEnum({ Role, default: Role.TA })
  role: Role;
  @IsPositive()
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 })
  department: number;
  @IsString({ each: true })
  college: string;
  @ApiProperty()
  @IsNumber({}, { each: true })
  teachingCourses: number[];
  @ApiProperty()
  @Type(() => UpdateTeacherassistDto)
  @ValidateNested()
  teacherAssistant: UpdateTeacherassistDto;
}
