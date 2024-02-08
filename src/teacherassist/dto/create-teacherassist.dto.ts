import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TeacherType } from '../entities/enum/teacher.enum';

export class CreateTeacherassistDto {
  @IsString()
  degreeProgram: string;
  @IsNotEmpty()
  @IsEnum(TeacherType)
  teacherType: TeacherType;
  @IsNumber({ maxDecimalPlaces: 0 }, { each: true })
  // @IsPositive()
  courses: number[];
}
