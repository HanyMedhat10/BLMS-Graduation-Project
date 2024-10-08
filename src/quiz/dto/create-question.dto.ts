import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { QuestionsType } from '../entities/enum/questions-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  degree: number;
  @ApiProperty()
  @IsInt()
  quizId: number;
  @ApiProperty({ enum: QuestionsType })
  @IsEnum({ QuestionsType })
  @IsNotEmpty()
  questionType: QuestionsType;
  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  choice: string[];
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  answer: string;
}
