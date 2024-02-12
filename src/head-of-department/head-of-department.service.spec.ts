import { Test, TestingModule } from '@nestjs/testing';
import { HeadOfDepartmentService } from './head-of-department.service';

describe('HeadOfDepartmentService', () => {
  let service: HeadOfDepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeadOfDepartmentService],
    }).compile();

    service = module.get<HeadOfDepartmentService>(HeadOfDepartmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
