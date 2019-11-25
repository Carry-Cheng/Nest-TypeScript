
import { Module } from "@nestjs/common";
import { DatabaseModule } from './../../../database/database.module'
import { ManagerSingerController } from './controller/singer.controller'
import { SingerService } from "./service/singer.service"
@Module({
  imports: [DatabaseModule],
  controllers: [ManagerSingerController],
  providers: [SingerService]
})
export class SingerModule {}
