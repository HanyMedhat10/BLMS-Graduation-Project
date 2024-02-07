import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;
  @IsNumber()
  @IsPositive()
  department: number;
}
