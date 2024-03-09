import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';
export class CreateSubmitAssignmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @Min(1)
  assignmentId: number;
}
