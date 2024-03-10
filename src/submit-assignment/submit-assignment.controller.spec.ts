import { Test, TestingModule } from '@nestjs/testing';
import { SubmitAssignmentController } from './submit-assignment.controller';
import { SubmitAssignmentService } from './submit-assignment.service';

describe('SubmitAssignmentController', () => {
  let controller: SubmitAssignmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmitAssignmentController],
      providers: [SubmitAssignmentService],
    }).compile();

    controller = module.get<SubmitAssignmentController>(
      SubmitAssignmentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
