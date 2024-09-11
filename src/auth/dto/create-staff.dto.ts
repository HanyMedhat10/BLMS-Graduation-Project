import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateStaffDto extends CreateUserDto {
  @IsPositive()
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 })
  department: number;
  //   @IsPositive()
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 }, { each: true })
  teachingCourses: number[];
}
