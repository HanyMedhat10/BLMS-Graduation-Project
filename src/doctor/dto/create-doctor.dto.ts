import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { Role } from 'src/auth/entities/enum/user.enum';

export class CreateDoctorDto extends CreateUserDto {
  @IsEnum({ Role, default: Role.DR })
  role = Role.DR;
  @ApiProperty()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 0 })
  department: number;
  @ApiProperty()
  // @IsPositive()
  @IsNumber({ maxDecimalPlaces: 0 }, { each: true })
  // @Min(1)
  teachingCourses: number[];
}
