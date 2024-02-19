import { Injectable } from '@nestjs/common';
import { Chord } from './entities/chord.entity';
import { MajorKey, MinorKey, majorKey, minorKey } from '@tonaljs/key';
import { midiToNoteName } from '@tonaljs/midi';

@Injectable()
export class ChordService {
  findOneByNoteName(noteName: string): Chord {
    return this.getChordByNoteName(noteName);
  }

  findOneByPitchClassAndMode(pitchClass: number, mode: number): Chord {
    return this.getChordByPitchClassAndMode(pitchClass, mode);
  }

  getChordByPitchClassAndMode(pitchClass: number, mode: number): Chord {
    if (pitchClass == -1)
      return {
        chords: [],
        key: undefined,
        mode: undefined,
        tonic: undefined,
      };

    const noteName: string = midiToNoteName(pitchClass, { pitchClass: true });

    return this.getChordByNoteName(noteName, mode);
  }

  getChordByNoteName(noteName: string, mode: number = -1): Chord {
    if (!noteName) {
      return {
        chords: [],
        key: undefined,
        mode: undefined,
        tonic: undefined,
      };
    }

    if (mode == -1) {
      if (noteName.includes('m')) {
        noteName = noteName.replace('m', '');
        mode = 0;
      } else {
        mode = 1;
      }
    }

    // Major key
    if (mode) {
      const mk: MajorKey = majorKey(noteName);

      const chords = mk.triads.map((chord) => chord.replace('dim', ''));

      return {
        chords,
        key: chords[0],
        mode: mk.type,
        tonic: mk.tonic,
      };
    }

    // Minor key
    const mink: MinorKey = minorKey(noteName);

    const chords = mink.natural.triads.map((chord) => chord.replace('dim', ''));

    return {
      chords,
      key: chords[0],
      mode: mink.type,
      tonic: mink.tonic,
    };
  }
}
