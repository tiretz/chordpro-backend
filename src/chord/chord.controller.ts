import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChordService } from './chord.service';
import { Chord } from './entities/chord.entity';

@Controller('chord')
export class ChordController {
  constructor(private readonly chordService: ChordService) {}

  @Get('byNoteName/:noteName')
  findOneByNoteName(@Param('noteName') noteName: string): Chord {
    return this.chordService.findOneByNoteName(noteName);
  }

  @Get('byPitchClass/:pitchClass/:mode')
  findOneByPitchClassAndMode(@Param('pitchClass') pitchClass: number, @Param('mode') mode: number): Chord {
    return this.chordService.findOneByPitchClassAndMode(+pitchClass, +mode);
  }
}
