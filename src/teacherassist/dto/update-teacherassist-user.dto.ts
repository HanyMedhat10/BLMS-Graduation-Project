import { PartialType } from '@nestjs/swagger';
import { CreateTeacherAssistUserDto } from './create-teacherassist-user.dto';

export class UpdateTeacherAssistUserDto extends PartialType(
  CreateTeacherAssistUserDto,
) {}
