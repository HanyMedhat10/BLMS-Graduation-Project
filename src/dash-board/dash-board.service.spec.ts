import { Test, TestingModule } from '@nestjs/testing';
import { DashBoardService } from './dash-board.service';

describe('DashBoardService', () => {
  let service: DashBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashBoardService],
    }).compile();

    service = module.get<DashBoardService>(DashBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
