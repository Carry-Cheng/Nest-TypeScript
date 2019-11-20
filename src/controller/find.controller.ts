import { FindService } from './../service/find.service';
import { Controller, Get, HttpCode } from '@nestjs/common';
import { Music } from '../interface/Music.d'
@Controller('find')
export class FindController {
  constructor(private readonly findService: FindService) {}
  @Get('/recommendList')
  @HttpCode(200)
  getRecommendList(): Array<Music> {
    return this.findService.getRecommendList()
  }
}
