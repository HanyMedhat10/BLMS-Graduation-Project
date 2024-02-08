import { Test, TestingModule } from '@nestjs/testing';
import { TeacherassistController } from './teacherassist.controller';
import { TeacherassistService } from './teacherassist.service';

describe('TeacherassistController', () => {
  let controller: TeacherassistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherassistController],
      providers: [TeacherassistService],
    }).compile();

    controller = module.get<TeacherassistController>(TeacherassistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
