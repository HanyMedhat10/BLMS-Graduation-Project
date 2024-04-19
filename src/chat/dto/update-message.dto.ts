import { PartialType } from '@nestjs/swagger';
// import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  // @ApiProperty()
  // //   @IsOptional()
  // @IsInt()
  // @Min(1)
  // chatId: number;
  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // content: string;
}
