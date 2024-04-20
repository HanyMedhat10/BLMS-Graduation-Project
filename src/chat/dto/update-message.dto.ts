import { ApiProperty, PartialType } from '@nestjs/swagger';
// import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';
import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @ApiProperty({ description: 'message id:entry in real time chat' })
  @IsOptional()
  @IsInt()
  @Min(1)
  messageId: number;
  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // content: string;
}
