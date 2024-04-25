import { Test, TestingModule } from '@nestjs/testing';
import { SubmitQuizService } from './submit-quiz.service';

describe('SubmitQuizService', () => {
  let service: SubmitQuizService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmitQuizService],
    }).compile();

    service = module.get<SubmitQuizService>(SubmitQuizService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
