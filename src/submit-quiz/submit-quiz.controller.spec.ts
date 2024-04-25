import { Test, TestingModule } from '@nestjs/testing';
import { SubmitQuizController } from './submit-quiz.controller';
import { SubmitQuizService } from './submit-quiz.service';

describe('SubmitQuizController', () => {
  let controller: SubmitQuizController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmitQuizController],
      providers: [SubmitQuizService],
    }).compile();

    controller = module.get<SubmitQuizController>(SubmitQuizController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
