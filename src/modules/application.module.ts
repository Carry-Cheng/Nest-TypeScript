import { Module } from "@nestjs/common";
import { RecommendModule } from "./app/recommend/recommend.module";
import { CommonModule } from "./app/common/common.module";

@Module({
  imports: [
    RecommendModule,
    CommonModule
  ]
})
export class ApplicationModule {}