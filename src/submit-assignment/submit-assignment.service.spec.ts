import { Test, TestingModule } from '@nestjs/testing';
import { SubmitAssignmentService } from './submit-assignment.service';

describe('SubmitAssignmentService', () => {
  let service: SubmitAssignmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmitAssignmentService],
    }).compile();

    service = module.get<SubmitAssignmentService>(SubmitAssignmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
