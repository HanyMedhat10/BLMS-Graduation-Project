import { PartialType } from '@nestjs/swagger';
import { CreateHeadOfDepartmentDto } from './create-head-of-department.dto';

export class UpdateHeadOfDepartmentDto extends PartialType(
  CreateHeadOfDepartmentDto,
) {}
