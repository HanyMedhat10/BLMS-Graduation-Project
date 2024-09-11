import { IsEnum } from 'class-validator';
import { Role } from '../entities/enum/user.enum';
import { CreateUserDto } from './create-user.dto';

export class CreateAdminDto extends CreateUserDto {
  @IsEnum({ Role, default: Role.ADMIN })
  role = Role.ADMIN;
}
