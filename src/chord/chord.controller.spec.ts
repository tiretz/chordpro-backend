import { Test, TestingModule } from '@nestjs/testing';
import { ChordController } from './chord.controller';
import { ChordService } from './chord.service';

describe('ChordController', () => {
  let controller: ChordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChordController],
      providers: [ChordService],
    }).compile();

    controller = module.get<ChordController>(ChordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
