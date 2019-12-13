import { Controller, Get } from "@nestjs/common";
import { RecommendService } from "../service/recommend.service";

@Controller('v1/app/recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}
  @Get('/list')
  async getRecommendList(): Promise<{}> {
    return this.recommendService.getRecommendList()
  }
}