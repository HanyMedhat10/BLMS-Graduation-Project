import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class StudentCourses {
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 }, { each: true })
  courses: number[];
}
