import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../../database/database.module";
import { ManagerUploadController } from "./controller/upload.controller";
import { UploadService } from "./service/upload.service";

@Module({
  imports: [DatabaseModule],
  controllers: [ManagerUploadController],
  providers: [UploadService]
})
export class UploadModule {}