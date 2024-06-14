import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateSubmitQuizDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Min(1)
  quizId: number;
  @ApiProperty({ type: [Number] })
  @IsInt({ each: true })
  @IsNotEmpty()
  questionId: number[];
  @ApiProperty({ type: [String] })
  @IsString({ each: true })
  @IsNotEmpty()
  @ArrayNotEmpty()
  answer: string[];
}
