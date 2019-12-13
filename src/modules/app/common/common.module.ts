import { Module } from "@nestjs/common";
import { CommonController } from "./controller/common.controller";
import { DatabaseModule } from "../../../database/database.module";
import { CommonService } from "./service/common.service";

@Module({
  imports: [DatabaseModule],
  controllers: [CommonController],
  providers: [CommonService]
})
export class CommonModule {}