import { PartialType } from '@nestjs/swagger';
import { CreateSubmitQuizDto } from './create-submit-quiz.dto';

export class UpdateSubmitQuizDto extends PartialType(CreateSubmitQuizDto) {}
