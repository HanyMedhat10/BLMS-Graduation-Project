import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmitQuiz } from 'src/submit-quiz/entities/submit-quiz.entity';
import { SubmitQuestion } from 'src/submit-quiz/entities/submit-question.entity';
import { User } from 'src/auth/entities/user.entity';
import { CourseService } from 'src/course/course.service';
import { Repository } from 'typeorm';

@Injectable()
export class DashBoardService {
  constructor(
    @InjectRepository(SubmitQuiz)
    private readonly submitQuizRepository: Repository<SubmitQuiz>,
    @InjectRepository(SubmitQuestion)
    private readonly submitQuestionRepository: Repository<SubmitQuestion>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly courseService: CourseService,
  ) {}

  async averageScoresOfOneQuiz(id: number) {
    const submitQuizzes = await this.findSubmitQuiz(id);
    let sum = 0;
    for (const submitQuiz of submitQuizzes) {
      if (submitQuiz.degree != null) {
        sum += submitQuiz.degree;
      }
    }
    return sum / submitQuizzes.length;
  }
  async numberOfSubmittedQuizzes(id: number) {
    const submitQuizzes = await this.findSubmitQuiz(id);
    return submitQuizzes.length;
  }
  async percentageOfSubmittedQuizzes(id: number) {
    const submittedQuizzes = await this.findSubmitQuiz(id);
    const courseId = submittedQuizzes[0].quiz.course.id;
    const totalEnrollmentsInCourse =
      await this.courseService.numberOfUsersEnrolled(courseId);
    return (submittedQuizzes.length / totalEnrollmentsInCourse) * 100;
  }
  async percentageOfPassedQuizzes(id: number) {
    const submittedQuizzes = await this.findSubmitQuiz(id);
    const average = submittedQuizzes[0].quiz.degree / 2;
    let numberOfPassedQuizzes = 0;
    for (const submittedQuiz of submittedQuizzes) {
      if (submittedQuiz.degree >= average) {
        numberOfPassedQuizzes++;
      }
    }
    return (numberOfPassedQuizzes / submittedQuizzes.length) * 100;
  }
  async percentageOfFullScoresQuestions(id: number) {
    const submittedQuestions = await this.findSubmitQuestions(id);
    let numberOfGetterFullScoresQuestions: number = 0;
    for (const submittedQuestion of submittedQuestions) {
      if (submittedQuestion.degree == submittedQuestion.question.degree) {
        numberOfGetterFullScoresQuestions++;
      }
    }
    return (
      (numberOfGetterFullScoresQuestions / submittedQuestions.length) * 100
    );
  }
  async findSubmitQuestions(id: number) {
    return await this.submitQuestionRepository.find({
      where: { question: { id: id } },
      relations: {
        question: true,
      },
    });
  }
  async findSubmitQuiz(id: number) {
    return await this.submitQuizRepository.find({
      where: { quiz: { id: id } },
      relations: {
        quiz: true,
      },
    });
  }
}
