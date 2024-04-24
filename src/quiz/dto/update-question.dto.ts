import { PartialType } from '@nestjs/swagger/dist/type-helpers';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
