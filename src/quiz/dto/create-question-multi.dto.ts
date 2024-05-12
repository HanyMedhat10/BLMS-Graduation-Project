import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { QuestionsType } from '../entities/enum/questions-type.enum';

export class CreateQuestionQuizDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
  @ApiProperty({ enum: QuestionsType })
  @IsEnum({ QuestionsType, default: QuestionsType.SINGLE_CHOICE })
  @IsNotEmpty()
  questionType: QuestionsType;
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  degree: number;
  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsNotEmpty()
  choices: string[];
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  answer: string;
}
