
import { Injectable } from "@nestjs/common"
import { Music } from "src/interface/Music.d"
@Injectable()
export class FindService {
  private readonly musics: Music[] = []

  getRecommendList(): Music[] {
    return this.musics
  }
}
