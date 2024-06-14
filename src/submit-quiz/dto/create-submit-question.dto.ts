import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsNotEmpty, Min, IsString } from 'class-validator';

export class CreateSubmitQuestionDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Min(1)
  questionId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  answer: string;
}
