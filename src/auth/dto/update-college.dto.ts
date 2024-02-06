import { PartialType } from '@nestjs/mapped-types';
import { CreateCollege } from './create-college.dto';

export class UpdateCollegeDto extends PartialType(CreateCollege) {}
