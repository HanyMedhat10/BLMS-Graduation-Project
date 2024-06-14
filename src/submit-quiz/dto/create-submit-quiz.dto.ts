import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsPositive,
  Min,
  ValidateNested,
} from 'class-validator';

import { CreateSubmitQuestionDto } from './create-submit-question.dto';
import { Type } from 'class-transformer';

export class CreateSubmitQuizDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Min(1)
  quizId: number;
  @ApiProperty({ type: [CreateSubmitQuestionDto] })
  @ArrayNotEmpty()
  @Type(() => CreateSubmitQuestionDto)
  @ValidateNested({ each: true })
  questions: CreateSubmitQuestionDto[];
}
