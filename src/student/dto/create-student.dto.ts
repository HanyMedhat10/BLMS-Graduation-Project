import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  classes: string;
  // @ApiProperty()
  // @IsString()
  // degreeProgram: string;
  // @ApiProperty({ enum: ['Post Graduate', 'Under Graduate'] })
  // @IsNotEmpty()
  // @IsEnum(StudentType)
  // studentType: StudentType;
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 }, { each: true })
  // @IsPositive()
  courses: number[];
}
