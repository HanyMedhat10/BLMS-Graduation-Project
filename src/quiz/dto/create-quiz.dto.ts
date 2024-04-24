import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  courseId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  startDate: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  endDate: Date;
}
