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
  @ApiProperty({ enum: ['head Of Department'] })
  @IsEnum({ Role, default: Role.HOfDE })
  role: Role;
  @IsPositive()
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 })
  department: number;
  @IsInt()
  @Min(1)
  college: number;
  //   @IsPositive()
  @ApiProperty()
  @IsNumber({}, { each: true })
  teachingCourses: number[];
}
