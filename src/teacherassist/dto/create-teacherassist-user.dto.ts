import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { Role } from 'src/auth/entities/enum/user.enum';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

export class CreateTeacherAssistUserDto extends CreateUserDto {
  @IsEnum({ Role, default: Role.TA })
  role = Role.TA;
  @IsPositive()
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 })
  department: number;
  @ApiProperty()
  @IsNumber({}, { each: true })
  teachingCourses: number[];
  // @ApiProperty()
  // @Type(() => UpdateTeacherassistDto)
  // @ValidateNested()
  // teacherAssistant: UpdateTeacherassistDto;
}
