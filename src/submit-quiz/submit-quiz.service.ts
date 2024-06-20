import { Injectable } from '@nestjs/common';
import { CreateSubmitQuizDto } from './dto/create-submit-quiz.dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmitQuiz } from './entities/submit-quiz.entity';
import { Repository } from 'typeorm';
import { SubmitQuestion } from './entities/submit-question.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Questions } from 'src/quiz/entities/questions.entity';

@Injectable()
export class SubmitQuizService {
  constructor(
    @InjectRepository(SubmitQuiz)
    private readonly submitQuizRepository: Repository<SubmitQuiz>,
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(SubmitQuestion)
    private readonly submitQuestionRepository: Repository<SubmitQuestion>,
    @InjectRepository(Questions)
    private readonly questionRepository: Repository<Questions>,
  ) {}
  async create(createSubmitQuizDto: CreateSubmitQuizDto, currentUser: User) {
    const quiz = await this.quizRepository.findOneBy({
      id: createSubmitQuizDto.quizId,
    });
    let submitQuiz = this.submitQuizRepository.create({
      quiz: quiz,
      solver: currentUser,
    });
    submitQuiz = await this.submitQuizRepository.save(submitQuiz);
    // await Promise.all(
    //   createSubmitQuizDto.questionId.map(async (questionId) => {
    //     await this.submitQuestionRepository.create({
    //       answer: createSubmitQuizDto.answer[questionId],
    //       submitQuiz: submitQuiz,
    //       question: await this.questionRepository.findOne({
    //         where: { id: questionId },
    //       }),
    //       // The above line is equivalent to the following one:
    //       // question: await this.questionRepository.findOneOrFail({ id: questionId }),
    //     });
    //   }),
    // );
    for (const question of createSubmitQuizDto.questions) {
      const questionId = await this.questionRepository.findOne({
        where: { id: question.questionId },
      });
      const submitQuestion = this.submitQuestionRepository.create({
        answer: question.answer,
        submitQuiz: submitQuiz,
        question: questionId,
      });
      await this.submitQuestionRepository.save(submitQuestion);
    }

    return await this.submitQuizRepository.save(submitQuiz);
  }

  async findAll() {
    return await this.submitQuizRepository.find({
      relations: {
        quiz: true,
        solver: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.submitQuizRepository.findOne({
      where: { id },
      relations: {
        quiz: true,
        solver: true,
        submitQuestions: {
          question: true,
        },
      },
    });
  }

  async correctionAutomaticSubmitQuiz(id: number) {
    const submitQuiz = await this.submitQuizRepository.findOne({
      where: { id },
      relations: {
        submitQuestions: {
          question: true,
        },
      },
    });
    let sumDegree = 0;
    for (const submitQuestion of submitQuiz.submitQuestions) {
      if (submitQuestion.answer == submitQuestion.question.answer) {
        const question = await this.questionRepository.findOne({
          where: { id: submitQuestion.question.id },
          select: ['degree'],
        });
        sumDegree += question?.degree;
        submitQuestion.degree = question?.degree || 0;
      } else {
        submitQuestion.degree = 0;
      }
    }
    submitQuiz.degree = sumDegree;
    return await this.submitQuizRepository.save(submitQuiz);
  }
  async correctionQuestion(id: number, degree: number, currentUser: User) {
    const submitQuestion = await this.submitQuestionRepository.findOne({
      where: { id },
    });
    submitQuestion.degree = degree;
    submitQuestion.submitQuiz.correctBy = currentUser;
    return await this.submitQuestionRepository.save(submitQuestion);
  }

  async remove(id: number) {
    return await this.submitQuizRepository.delete(id);
  }
}
