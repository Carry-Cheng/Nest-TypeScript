import { Module } from "@nestjs/common";
import { RecommendController } from "./controller/recommend.controller";
import { DatabaseModule } from "../../../database/database.module";
import { RecommendService } from "./service/recommend.service";

@Module({
  imports: [DatabaseModule],
  controllers: [RecommendController],
  providers: [RecommendService]
})
export class RecommendModule {}