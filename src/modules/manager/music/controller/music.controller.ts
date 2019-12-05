import { MusicService } from './../service/music.service';
import { CreateMusicInfoDTO } from "./../dto/create-music-info.dto";
import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { QueryMusicInfoDTO } from '../dto/query-music-info.dto';

@Controller('v1/manager/music')
export class ManagerMusicController {
  constructor(private readonly musicService: MusicService) {}
  @Post('/createMusicInfo')
  createMusic(@Body() createMusicInfoDTO: CreateMusicInfoDTO): void {
    this.musicService.createMusicInfo(createMusicInfoDTO)
  }

  @Get('/getMusicInfo')
  getAlbum(@Query() query: QueryMusicInfoDTO): Promise<{}> {
    return this.musicService.getMusicInfo(query)
  }

}
