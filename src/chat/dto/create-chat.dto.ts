import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateChatDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  chatId: number;
  @ApiProperty()
  @IsInt()
  @Min(1)
  receiverId: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

}
