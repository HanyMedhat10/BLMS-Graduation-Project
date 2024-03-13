import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Role } from 'src/auth/entities/enum/user.enum';

export class CreateClerkDto {
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
  @ApiProperty({ enum: ['clerk'] })
  @IsEnum({ Role, default: Role.CLERK })
  role: Role;
  @ApiProperty()
  @IsInt()
  @Min(1)
  college: number;
}
