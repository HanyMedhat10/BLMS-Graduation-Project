import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { StudentType } from '../entities/enum/student.enum';

export class CreateStudentDto {
  @IsString()
  classes: string;
  @IsString()
  degreeProgram: string;
  @IsNotEmpty()
  @IsEnum(StudentType)
  studentType: StudentType;
  @IsNumber({ maxDecimalPlaces: 0 }, { each: true })
  // @IsPositive()
  courses: number[];
}
