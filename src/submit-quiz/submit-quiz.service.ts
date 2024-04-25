import { Injectable } from '@nestjs/common';
import { CreateSubmitQuizDto } from './dto/create-submit-quiz.dto';
import { UpdateSubmitQuizDto } from './dto/update-submit-quiz.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SubmitQuizService {
  create(createSubmitQuizDto: CreateSubmitQuizDto, currentUser: User) {
    return 'This action adds a new submitQuiz';
  }

  findAll() {
    return `This action returns all submitQuiz`;
  }

  findOne(id: number) {
    return `This action returns a #${id} submitQuiz`;
  }

  update(id: number, updateSubmitQuizDto: UpdateSubmitQuizDto) {
    return `This action updates a #${id} submitQuiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} submitQuiz`;
  }
}
