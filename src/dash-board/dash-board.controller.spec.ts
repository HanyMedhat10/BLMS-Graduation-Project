import { Test, TestingModule } from '@nestjs/testing';
import { DashBoardController } from './dash-board.controller';
import { DashBoardService } from './dash-board.service';

describe('DashBoardController', () => {
  let controller: DashBoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashBoardController],
      providers: [DashBoardService],
    }).compile();

    controller = module.get<DashBoardController>(DashBoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
