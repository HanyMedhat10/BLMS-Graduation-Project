import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TeacherType } from '../entities/enum/teacher.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherassistDto {
  @ApiProperty()
  @IsString()
  degreeProgram: string;
  @ApiProperty({ enum: ['Study Master', 'Researcher'] })
  @IsNotEmpty()
  @IsEnum(TeacherType)
  teacherType: TeacherType;
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 }, { each: true })
  // @IsPositive()
  courses: number[];
}
