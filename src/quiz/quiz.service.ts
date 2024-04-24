import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { Questions } from './entities/questions.entity';
import { Choice } from './entities/choice.entity';
import { User } from 'src/auth/entities/user.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsType } from './entities/enum/questions-type.enum';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(Questions)
    private readonly questionsRepository: Repository<Questions>,
    @InjectRepository(Choice)
    private readonly choiceRepository: Repository<Choice>,
  ) {}
  async createQuiz(createQuizDto: CreateQuizDto, currentUser: User) {
    let quiz = new Quiz();
    quiz = Object.assign(quiz, createQuizDto);
    quiz.createBy = currentUser;
    return await this.questionsRepository.save(quiz);
  }
  async createQuestion(createQuestionDto: CreateQuestionDto) {
    const Quiz = await this.findOneQuiz(createQuestionDto.quizId);
    if (
      !createQuestionDto.choice &&
      (createQuestionDto.questionType == QuestionsType.MULTIPLE_CHOICE ||
        createQuestionDto.questionType == QuestionsType.SINGLE_CHOICE)
    ) {
      throw new NotFoundException("choice can't be empty");
    }
    let question = new Questions();
    question = Object.assign(question, createQuestionDto);
    question.quiz = Quiz;
    question = await this.questionsRepository.save(question);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const choices = createQuestionDto.choice.map(async (choice) => {
      const choiceObject = new Choice();
      choiceObject.option = choice;
      choiceObject.question = question;
      await this.choiceRepository.save(choiceObject);
    });
    return question;
  }
  async findOneQuiz(id: number) {
    return await this.quizRepository.findOne({ where: { id } });
  }

  findAll() {
    return `This action returns all quiz`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
