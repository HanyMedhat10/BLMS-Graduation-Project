import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Choice } from './entities/choice.entity';
import { Questions } from './entities/questions.entity';
import { CourseModule } from 'src/course/course.module';
import { SubmitQuiz } from 'src/submit-quiz/entities/submit-quiz.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Choice, Questions, SubmitQuiz]),
    CourseModule,
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
