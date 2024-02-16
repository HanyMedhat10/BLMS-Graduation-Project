import { PartialType } from '@nestjs/swagger';
import { CreateStudentUserDto } from './create-student-user-dto';

export class UpdateStudentUserDto extends PartialType(CreateStudentUserDto) {}
