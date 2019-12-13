import { Module } from "@nestjs/common";
import { MusicModule } from './manager/music/music.module'
import { SingerModule } from './manager/singer/singer.module'
import { AlbumModule } from './manager/album/album.module'
import { UploadModule } from "./manager/upload/upload.module"

@Module({
  imports: [
    MusicModule,
    SingerModule,
    AlbumModule,
    UploadModule
  ]
})
export class ManagerModule {}
