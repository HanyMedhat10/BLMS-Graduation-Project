import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherAssistUserDto } from './create-teacherassist-user.dto';

export class UpdateTeacherAssistUserDto extends PartialType(
  CreateTeacherAssistUserDto,
) {}
