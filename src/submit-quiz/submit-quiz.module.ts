import { Module } from '@nestjs/common';
import { SubmitQuizService } from './submit-quiz.service';
import { SubmitQuizController } from './submit-quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmitQuiz } from './entities/submit-quiz.entity';
import { SubmitQuestion } from './entities/submit-question.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Questions } from 'src/quiz/entities/questions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubmitQuiz, SubmitQuestion, Quiz, Questions]),
  ],
  controllers: [SubmitQuizController],
  providers: [SubmitQuizService],
})
export class SubmitQuizModule {}
