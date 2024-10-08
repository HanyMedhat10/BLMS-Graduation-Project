import { Module } from '@nestjs/common';
import { DashBoardService } from './dash-board.service';
import { DashBoardController } from './dash-board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Questions } from 'src/quiz/entities/questions.entity';
import { SubmitQuiz } from 'src/submit-quiz/entities/submit-quiz.entity';
import { SubmitQuestion } from 'src/submit-quiz/entities/submit-question.entity';
import { CourseModule } from 'src/course/course.module';
import { User } from 'src/auth/entities/user.entity';
import { SubmitAssignment } from 'src/submit-assignment/entities/submit-assignment.entity';
import { Course } from 'src/course/entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quiz,
      Questions,
      SubmitQuiz,
      SubmitQuestion,
      User,
      SubmitAssignment,
      Course,
    ]),
    CourseModule,
  ],
  controllers: [DashBoardController],
  providers: [DashBoardService],
})
export class DashBoardModule {}
