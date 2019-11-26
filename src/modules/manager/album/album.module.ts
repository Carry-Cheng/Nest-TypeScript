
import { Module } from "@nestjs/common";
import { DatabaseModule } from './../../../database/database.module'
import { ManagerAlbumController } from './controller/album.controller'
import { AlbumService } from './service/album.service'
@Module({
  imports: [DatabaseModule],
  controllers: [ManagerAlbumController],
  providers: [AlbumService]
})
export class AlbumModule {}
