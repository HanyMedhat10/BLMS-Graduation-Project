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
import { UpdateQuestionDto } from './dto/update-question.dto';

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
    return await this.quizRepository.findOne({
      where: { id },
      relations: {
        questions: {
          choices: true,
        },
      },
      select: {
        questions: {
          id: true,
          question: true,
          answer: false,
          degree: true,
          questionType: true,
          choices: {
            id: true,
            option: true,
          },
        },
      },
    });
  }
  async findAllQuiz() {
    return await this.quizRepository.findOne({
      relations: {
        questions: {
          choices: true,
        },
      },
      select: {
        questions: {
          id: true,
          question: true,
          answer: false,
          degree: true,
          questionType: true,
          choices: {
            id: true,
            option: true,
          },
        },
      },
    });
  }

  async findAllQuestion() {
    return await this.questionsRepository.find({
      relations: {
        quiz: true,
        choices: true,
      },
      select: {
        id: true,
        question: true,
        answer: false,
        degree: true,
        questionType: true,
        quiz: {
          id: true,
          title: true,
        },
        choices: {
          id: true,
          option: true,
        },
      },
    });
  }

  async findOneQuestion(id: number) {
    return await this.questionsRepository.findOne({
      where: { id },
      relations: {
        quiz: true,
        choices: true,
      },
      select: {
        id: true,
        question: true,
        answer: false,
        degree: true,
        questionType: true,
        quiz: {
          id: true,
          title: true,
        },
        choices: {
          id: true,
          option: true,
        },
      },
    });
  }
  async updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto) {
    let question = await this.findOneQuestion(id);
    if (!question) {
      throw new NotFoundException('question not found');
    }
    if (
      // question.questionType != QuestionsType.MULTIPLE_CHOICE &&
      // question.questionType != QuestionsType.SINGLE_CHOICE &&
      question.questionType == QuestionsType.SHORT_ANSWER &&
      (updateQuestionDto.questionType == QuestionsType.MULTIPLE_CHOICE ||
        updateQuestionDto.questionType == QuestionsType.SINGLE_CHOICE)
    ) {
      // throw new BadRequestException("this question type can't be changed");
      if (updateQuestionDto.choice && updateQuestionDto.choice.length > 0) {
        const choices = updateQuestionDto.choice.map(async (choice) => {
          const choiceObject = new Choice();
          choiceObject.option = choice;
          choiceObject.question = question;
          return await this.choiceRepository.save(choiceObject);
        });
        await Promise.all(choices).then((choices) => {
          question.choices = choices;
        });
        return await this.questionsRepository.save(question);
      }
    }
    if (
      question.questionType != QuestionsType.SHORT_ANSWER ||
      updateQuestionDto.questionType == QuestionsType.SHORT_ANSWER
    ) {
      question.choices = question.choices.filter(async (choice) => {
        return await this.choiceRepository.delete(choice.id);
      });
    }
    if (
      question.questionType == updateQuestionDto.questionType &&
      question.questionType != QuestionsType.SHORT_ANSWER
    ) {
      question.choices = question.choices.filter(async (choice) => {
        return await this.choiceRepository.delete(choice.id);
      });
      const choices = updateQuestionDto.choice.map(async (choice) => {
        const choiceObject = new Choice();
        choiceObject.option = choice;
        choiceObject.question = question;
        return await this.choiceRepository.save(choiceObject);
      });
      await Promise.all(choices).then((choices) => {
        question.choices = choices;
      });
    }
    question = Object.assign(question, updateQuestionDto);
    return await this.questionsRepository.save(question);
  }
  async updateQuiz(id: number, updateQuizDto: UpdateQuizDto) {
    let quiz = await this.findOneQuiz(id);
    if (!quiz) {
      throw new NotFoundException('quiz not found');
    }
    quiz = Object.assign(quiz, updateQuizDto);
    return await this.quizRepository.save(quiz);
  }
  async removeQuestion(id: number) {
    return await this.questionsRepository.delete(id);
  }
  async removeQuiz(id: number) {
    return await this.questionsRepository.delete(id);
  }
}
