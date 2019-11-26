
import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { CreateAlbumDTO } from '../dto/create-album.dto'
import { QueryAlbumDTO } from '../dto/query-album.dto'
import { AlbumService } from '../service/album.service'

@Controller('v1/manager/album')
export class ManagerAlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @Post('/createAlbum')
  createAlbum(@Body() createAlbumDTO: CreateAlbumDTO): void {
    this.albumService.createAlbum(createAlbumDTO)
  }

  @Get('/getAlbum')
  getAlbum(@Query() query: QueryAlbumDTO): Promise<{}> {
    return this.albumService.getAlbum(query)
  }
}
