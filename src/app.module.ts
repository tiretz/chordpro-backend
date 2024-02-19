import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SongModule } from './song/song.module';
import { ConfigModule } from '@nestjs/config';
import { ChordModule } from './chord/chord.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SongModule,
    ChordModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
