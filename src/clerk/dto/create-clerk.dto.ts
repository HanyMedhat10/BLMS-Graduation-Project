import { IsEnum } from 'class-validator';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { Role } from 'src/auth/entities/enum/user.enum';

export class CreateClerkDto extends CreateUserDto {
  @IsEnum({ Role, default: Role.CLERK })
  role = Role.CLERK;
}
