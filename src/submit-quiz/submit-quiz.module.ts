import { Module } from '@nestjs/common';
import { SubmitQuizService } from './submit-quiz.service';
import { SubmitQuizController } from './submit-quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmitQuiz } from './entities/submit-quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubmitQuiz])],
  controllers: [SubmitQuizController],
  providers: [SubmitQuizService],
})
export class SubmitQuizModule {}
