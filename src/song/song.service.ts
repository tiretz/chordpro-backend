import { Injectable } from '@nestjs/common';
import { AudioFeatures, PartialSearchResult, SimplifiedArtist, SpotifyApi, Track } from '@spotify/web-api-ts-sdk';
import { ConfigService } from '@nestjs/config';
import { Song as LyricSearch } from 'genius-lyrics';
import { TrackInfo } from './entities/trackInfo.entity';
import { Song } from './entities/song.entity';
import { ChordService } from 'src/chord/chord.service';
import { Client } from 'genius-lyrics';
import { Chord } from 'src/chord/entities/chord.entity';

@Injectable()
export class SongService {
  private spotifyApi: SpotifyApi;
  private geniusClient: Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly chordService: ChordService,
  ) {
    this.spotifyApi = SpotifyApi.withClientCredentials(this.configService.get<string>('SPOTIFY_CLIENT_ID'), this.configService.get<string>('SPOTIFY_CLIENT_SECRET'));
    this.geniusClient = new Client();
  }

  async findAll(title: string = '', artists: string | string[] = []): Promise<TrackInfo[]> {
    const searchResult: Required<Pick<PartialSearchResult, 'tracks'>> = await this.spotifyApi.search(`${title} ${Array.isArray(artists) ? artists.join(', ') : artists}`, ['track'], null, 10);

    const songs: TrackInfo[] = searchResult.tracks.items.map((item: any) => {
      return {
        albumCoverUrl: item.album.images[0].url,
        albumName: item.album.name,
        albumReleaseDate: new Date(Date.parse(item.release_date)),
        artists: item.artists.map((artist: any) => artist.name),
        id: item.id,
        title: item.name,
        spotifyUrl: item.external_urls.spotify,
      };
    });

    return songs;
  }

  async findOne(id: string): Promise<Song> {
    const trackInfo: Track = await this.spotifyApi.tracks.get(id);

    const trackMetaInfo: AudioFeatures = await this.spotifyApi.tracks.audioFeatures(id);

    const lyricsSearches: LyricSearch[] = await this.geniusClient.songs.search(`${trackInfo.name} ${trackInfo.artists.map((artist: SimplifiedArtist) => artist.name).join(', ')}`.trim());
    const lyrics: string = (await lyricsSearches[0]?.lyrics()) || '';

    const chord: Chord = this.chordService.getChordByPitchClassAndMode(trackMetaInfo.key, trackMetaInfo.mode);

    const song: Song = {
      albumCoverUrl: trackInfo.album.images[0].url,
      albumName: trackInfo.album.name,
      albumReleaseDate: new Date(Date.parse(trackInfo.album.release_date)),
      artists: trackInfo.artists.map((artist: SimplifiedArtist) => artist.name),
      chords: chord.chords,
      duration: this.getDurationInMinAndSec(trackMetaInfo.duration_ms),
      id: trackInfo.id,
      key: chord.key,
      lyrics,
      mode: chord.mode,
      spotifyUrl: trackInfo.external_urls.spotify,
      tempo: trackMetaInfo.tempo,
      timeSignature: `${trackMetaInfo.time_signature}/4`,
      title: trackInfo.name,
    };

    return song;
  }

  private getDurationInMinAndSec(durationInMs: number): string {
    const min = Math.floor(durationInMs / 60000);
    const sec = Math.floor((durationInMs % 60000) / 1000);

    return sec === 60 ? min + 1 + ':00' : min + ':' + (sec < 10 ? '0' : '') + sec;
  }
}
