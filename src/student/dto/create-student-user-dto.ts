import { Role } from '../../auth/entities/enum/user.enum';
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
  // @ApiQuery({ name: 'role', enum: Role })
  // async filterByRole(@Query('role') role: Role = Role.STUDENT) {}
  @ApiProperty({ enum: ['student'] })
  @IsEnum({ Role, default: Role.STUDENT })
  role: Role;
  @IsPositive()
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 })
  department: number;
  @ApiProperty()
  @IsInt()
  @Min(1)
  college: number;
  @ApiProperty({ type: () => UpdateStudentDto })
  @Type(() => UpdateStudentDto)
  @ValidateNested()
  student: UpdateStudentDto;
}
