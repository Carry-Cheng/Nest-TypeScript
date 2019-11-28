
import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { CreateSingerDTO } from './../dto/create-singer.dto'
import { QuerySingerDTO } from './../dto/query-singer.dto'
import { SingerService } from './../service/singer.service'

@Controller('v1/manager/singer')
export class ManagerSingerController {
  constructor(private readonly singerService: SingerService) {}
  @Post('/createSinger')
  createSinger(@Body() createSingerDTO: CreateSingerDTO): void {
    this.singerService.createSinger(createSingerDTO)
  }

  @Get('/getSinger')
  getSinger(@Query() query: QuerySingerDTO): Promise<{}> {
    return this.singerService.getSinger(query)
  }

  @Get('/searchSinger')
  searchSinger(@Query() query: QuerySingerDTO): Promise<CreateSingerDTO[]> {
    return this.singerService.searchSinger(query)
  }
}
