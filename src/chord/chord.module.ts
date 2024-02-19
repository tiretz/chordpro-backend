import { Module } from '@nestjs/common';
import { ChordService } from './chord.service';
import { ChordController } from './chord.controller';

@Module({
  controllers: [ChordController],
  providers: [ChordService],
  exports: [ChordService],
})
export class ChordModule {}
