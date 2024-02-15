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
import { Role } from '../entities/enum/user.enum';
import { Type } from 'class-transformer';
import { UpdateStudentDto } from 'src/student/dto/update-student.dto';
import { UpdateTeacherassistDto } from 'src/teacherassist/dto/update-teacherassist.dto';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty()
  @IsEnum({ Role, default: Role.ADMIN })
  role: Role;
  @ApiProperty()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 0 })
  department: number;
  @ApiProperty()
  @IsString({ each: true })
  college: string;
  // @ApiProperty()
  // @Type(() => UpdateStudentDto)
  // @ValidateNested({ each: false })
  // student: UpdateStudentDto;
  // @ApiProperty()
  // @Type(() => UpdateTeacherassistDto)
  // @ValidateNested({ each: false })
  // teacherAssistant: UpdateTeacherassistDto;
}
