import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateQuestionQuizDto } from './create-question-multi.dto';
import { Type } from 'class-transformer';

export class CreateQuizDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  courseId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
  @ApiProperty({ type: () => [CreateQuestionQuizDto] })
  @Type(() => CreateQuestionQuizDto)
  // @IsArray()
  @ValidateNested({ each: true })
  questions: CreateQuestionQuizDto[];
}
