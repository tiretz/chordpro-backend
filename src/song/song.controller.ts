import { Controller, Get, Param, Query } from '@nestjs/common';
import { SongService } from './song.service';
import { TrackInfo } from './entities/trackInfo.entity';
import { Song } from './entities/song.entity';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get()
  async findAll(@Query('title') title: string = '', @Query('artists') artists: string[] = []): Promise<TrackInfo[]> {
    return await this.songService.findAll(title, artists);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Song> {
    return await this.songService.findOne(id);
  }
}
