import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { QuestionsType } from '../entities/enum/questions-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  question: string;
  @ApiProperty()
  @IsInt()
  quizId: number;
  @ApiProperty({ enum: ['admin'] })
  @IsEnum({ QuestionsType })
  @IsNotEmpty()
  questionType: QuestionsType;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  choice: string[];
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  answer: string;
}
