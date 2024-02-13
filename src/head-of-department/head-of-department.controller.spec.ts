import { Test, TestingModule } from '@nestjs/testing';
import { HeadOfDepartmentController } from './head-of-department.controller';
import { HeadOfDepartmentService } from './head-of-department.service';

describe('HeadOfDepartmentController', () => {
  let controller: HeadOfDepartmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeadOfDepartmentController],
      providers: [HeadOfDepartmentService],
    }).compile();

    controller = module.get<HeadOfDepartmentController>(
      HeadOfDepartmentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
