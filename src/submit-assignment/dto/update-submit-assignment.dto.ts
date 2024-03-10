import { PartialType } from '@nestjs/swagger';
import { CreateSubmitAssignmentDto } from './create-submit-assignment.dto';

export class UpdateSubmitAssignmentDto extends PartialType(
  CreateSubmitAssignmentDto,
) {}
