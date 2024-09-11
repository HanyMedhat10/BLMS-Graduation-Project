import { IsEnum } from 'class-validator';
import { Role } from 'src/auth/entities/enum/user.enum';
import { CreateStaffDto } from 'src/auth/dto/create-staff.dto';

export class CreateTeacherAssistUserDto extends CreateStaffDto {
  @IsEnum({ Role, default: Role.TA })
  role = Role.TA;
  // @ApiProperty()
  // @Type(() => UpdateTeacherassistDto)
  // @ValidateNested()
  // teacherAssistant: UpdateTeacherassistDto;
}
