import { TrackInfo } from './trackInfo.entity';
import { ITrackMetaInfo } from '../interfaces/trackMetaInfo.interface';
import { ITrackLyrics } from '../interfaces/trackLyrics.interface';

export class Song extends TrackInfo implements ITrackMetaInfo, ITrackLyrics {
  lyrics: string;
  chords: string[];
  duration: string;
  key: string | undefined;
  mode: string | undefined;
  tempo: number;
  timeSignature: string;
}
