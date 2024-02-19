import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { ChordModule } from 'src/chord/chord.module';

@Module({
  controllers: [SongController],
  providers: [SongService],
  imports: [ChordModule],
})
export class SongModule {}
