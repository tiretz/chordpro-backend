import { Test, TestingModule } from '@nestjs/testing';
import { ChordService } from './chord.service';

describe('ChordService', () => {
  let service: ChordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChordService],
    }).compile();

    service = module.get<ChordService>(ChordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
