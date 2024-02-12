import { PartialType } from '@nestjs/mapped-types';
import { CreateHeadOfDepartmentDto } from './create-head-of-department.dto';

export class UpdateHeadOfDepartmentDto extends PartialType(CreateHeadOfDepartmentDto) {}
