import { IsEnum } from 'class-validator';
import { CreateStaffDto } from 'src/auth/dto/create-staff.dto';
import { Role } from 'src/auth/entities/enum/user.enum';

export class CreateDoctorDto extends CreateStaffDto {
  @IsEnum({ Role, default: Role.DR })
  role = Role.DR;
}
