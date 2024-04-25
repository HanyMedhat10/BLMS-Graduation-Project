import { Module } from '@nestjs/common';
import { SubmitQuizService } from './submit-quiz.service';
import { SubmitQuizController } from './submit-quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmitQuiz } from './entities/submit-quiz.entity';
import { SubmitQuestion } from './entities/submit-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubmitQuiz, SubmitQuestion])],
  controllers: [SubmitQuizController],
  providers: [SubmitQuizService],
})
export class SubmitQuizModule {}
