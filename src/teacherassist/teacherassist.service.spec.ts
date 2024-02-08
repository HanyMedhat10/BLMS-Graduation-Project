import { Test, TestingModule } from '@nestjs/testing';
import { TeacherassistService } from './teacherassist.service';

describe('TeacherassistService', () => {
  let service: TeacherassistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherassistService],
    }).compile();

    service = module.get<TeacherassistService>(TeacherassistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
