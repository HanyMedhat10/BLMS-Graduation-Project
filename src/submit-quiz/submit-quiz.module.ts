import { Module } from '@nestjs/common';
import { SubmitQuizService } from './submit-quiz.service';
import { SubmitQuizController } from './submit-quiz.controller';

@Module({
  controllers: [SubmitQuizController],
  providers: [SubmitQuizService],
})
export class SubmitQuizModule {}
