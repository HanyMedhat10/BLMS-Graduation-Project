import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { Role } from 'src/auth/entities/enum/user.enum';

export class CreateHeadOfDepartmentDto extends CreateUserDto {
  @IsEnum({ Role, default: Role.HOfDE })
  role = Role.HOfDE;
  @IsPositive()
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 })
  department: number;
  //   @IsPositive()
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 }, { each: true })
  teachingCourses: number[];
}
