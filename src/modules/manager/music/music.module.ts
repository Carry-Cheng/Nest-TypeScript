
import { Module } from "@nestjs/common";
import { DatabaseModule } from './../../../database/database.module';
import { MusicService } from './service/music.service';
import { ManagerMusicController } from './controller/music.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ManagerMusicController],
  providers: [MusicService]
})
export class MusicModule {}
