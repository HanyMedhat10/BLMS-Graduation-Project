import { Injectable } from '@nestjs/common';
import { CreateSubmitQuizDto } from './dto/create-submit-quiz.dto';
import { UpdateSubmitQuizDto } from './dto/update-submit-quiz.dto';
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
    const submitQuiz = this.submitQuizRepository.create({
      quiz: quiz,
      solver: currentUser,
    });
    await Promise.all(
      createSubmitQuizDto.questionId.map(async (questionId) => {
        await this.submitQuestionRepository.create({
          answer: createSubmitQuizDto.answer[questionId],
          submitQuiz: submitQuiz,
          question: await this.questionRepository.findOne({
            where: { id: questionId },
          }),
          // The above line is equivalent to the following one:
          // question: await this.questionRepository.findOneOrFail({ id: questionId }),
        });
      }),
    );
    return submitQuiz;
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
    return `This action returns a #${id} submitQuiz`;
  }

  update(id: number, updateSubmitQuizDto: UpdateSubmitQuizDto) {
    return `This action updates a #${id} submitQuiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} submitQuiz`;
  }
}
