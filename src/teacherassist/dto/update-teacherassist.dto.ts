import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherassistDto } from './create-teacherassist.dto';

export class UpdateTeacherassistDto extends PartialType(
  CreateTeacherassistDto,
) {}
