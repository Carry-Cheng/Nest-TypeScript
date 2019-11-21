import { Module } from "@nestjs/common";
import { MusicModule } from './manager/music/music.module';

@Module({
  imports: [MusicModule]
})
export class ApplicationModule {
  constructor() {
    
  }
}
