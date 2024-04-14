import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class UpdateMessageDto {
  @ApiProperty()
  //   @IsOptional()
  @IsInt()
  @Min(1)
  id: number;
  @ApiProperty()
  @IsInt()
  @Min(1)
  receiverId: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}
