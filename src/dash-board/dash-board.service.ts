import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmitQuiz } from 'src/submit-quiz/entities/submit-quiz.entity';
import { SubmitQuestion } from 'src/submit-quiz/entities/submit-question.entity';
import { User } from 'src/auth/entities/user.entity';
import { CourseService } from 'src/course/course.service';
import { Repository } from 'typeorm';
import { SubmitAssignment } from 'src/submit-assignment/entities/submit-assignment.entity';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class DashBoardService {
  constructor(
    @InjectRepository(SubmitQuiz)
    private readonly submitQuizRepository: Repository<SubmitQuiz>,
    @InjectRepository(SubmitQuestion)
    private readonly submitQuestionRepository: Repository<SubmitQuestion>,
    @InjectRepository(SubmitAssignment)
    private readonly submitAssignmentRepository: Repository<SubmitAssignment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
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
    if (submittedQuizzes.length == 0) return 0;
    const courseId = submittedQuizzes[0].quiz.course.id;
    const totalEnrollmentsInCourse = await this.numberOfUsersEnrolled(courseId);
    return (submittedQuizzes.length / totalEnrollmentsInCourse) * 100;
  }
  async percentageOfPassedQuizzes(id: number) {
    const submittedQuizzes = await this.findSubmitQuiz(id);
    if (submittedQuizzes.length == 0) return 0;
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
        quiz: {
          course: true,
        },
      },
    });
  }
  async averageScoresOfOneAssignment(id: number): Promise<number> {
    const submitAssignments = await this.findSubmitAssignment(id);
    let sum = 0;
    for (const submitAssignment of submitAssignments) {
      if (submitAssignment.degree != null) {
        sum += submitAssignment.degree;
      }
    }
    return sum / submitAssignments.length;
  }
  async numberOfSubmitAssignment(id: number): Promise<number> {
    const submitAssignments = await this.findSubmitAssignment(id);
    return submitAssignments.length;
  }
  async percentageOfSubmitAssignment(id: number): Promise<number> {
    const submitAssignments = await this.findSubmitAssignment(id);
    const courseId = submitAssignments[0].assignment.course.id;
    const totalEnrollmentsInCourse = await this.numberOfUsersEnrolled(courseId);
    return (submitAssignments.length / totalEnrollmentsInCourse) * 100;
  }
  async findSubmitAssignment(assignmentId: number) {
    return await this.submitAssignmentRepository.find({
      where: { assignment: { id: assignmentId } },
      relations: { assignment: true, solver: true },
    });
  }

  async numberOfUsersEnrolled(id: number) {
    return await this.userRepository.count({ where: { courses: { id } } });
  }

  async numberOfCourses() {
    return await this.courseRepository.count();
  }
  async numberOfUsersForEachRole() {
    return await this.userRepository
      .createQueryBuilder('users')
      .select('users.role', 'role')
      .addSelect('COUNT(users.role)', 'count')
      .groupBy('users.role')
      .getRawMany();
  }
}
