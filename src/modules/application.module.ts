import { Module } from "@nestjs/common";
import { MusicModule } from './manager/music/music.module'
import { SingerModule } from './manager/singer/singer.module'
import { AlbumModule } from './manager/album/album.module'

@Module({
  imports: [
    MusicModule,
    SingerModule,
    AlbumModule
  ]
})
export class ApplicationModule {}
