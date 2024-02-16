// import { PartialType } from '@nestjs/swagger';
// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateTeacherassistDto } from './create-teacherassist.dto';

export class UpdateTeacherassistDto extends PartialType(
  CreateTeacherassistDto,
) {}
