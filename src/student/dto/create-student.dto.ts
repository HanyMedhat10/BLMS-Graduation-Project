import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { StudentType } from '../entities/enum/student.enum';

export class CreateStudentDto {
  @IsString()
  classes: string;
  @IsString()
  degreeProgram: string;
  @Type(() => User)
  @ValidateNested()
  user: User;
  @IsNotEmpty()
  @IsEnum(StudentType)
  studentType: StudentType;
}
