import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
export class CreateMessageDto {
  @ApiProperty()
  //   @IsOptional()
  @IsInt()
  @Min(1)
  chatId: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}
