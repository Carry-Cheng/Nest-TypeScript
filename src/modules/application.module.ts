import { Module } from "@nestjs/common";
import { MusicModule } from './manager/music/music.module'
import { SingerModule } from './manager/singer/singer.module'

@Module({
  imports: [
    MusicModule,
    SingerModule
  ]
})
export class ApplicationModule {}
