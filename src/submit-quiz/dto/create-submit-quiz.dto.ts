import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';

export class CreateSubmitQuizDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Min(1)
  quizId: number;
  @ApiProperty({ type: [Number] })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  questionId: number[];
  @ApiProperty({ type: [String] })
  @IsString()
  @IsNotEmpty()
  answer: string[];
}
