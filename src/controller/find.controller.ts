import { Controller, Get } from '@nestjs/common';
import Music from '../model/Music.d'
@Controller()
export class FindController {
  @Get('/recommend/list')
  getRecommendList(): Array<Music> {
    return []
  }
}
