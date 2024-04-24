import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { QuestionsType } from '../entities/enum/questions-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  question: string;
  @ApiProperty({ enum: ['admin'] })
  @IsEnum({ QuestionsType })
  @IsNotEmpty()
  questionType: QuestionsType;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  options: string[];
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  answer: string;
}
