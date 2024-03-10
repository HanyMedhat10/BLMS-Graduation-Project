import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
  // @Type(() => File)
  // fileSubmit: Express.Multer.File;
  @ApiProperty()
  @IsDateString()
  deadLine: Date;
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @Min(1)
  courseId: number;
  // @IsInt()
  // @ApiProperty()
  // @IsPositive()
  // @Min(1)
  // assignmentId: number;
}
