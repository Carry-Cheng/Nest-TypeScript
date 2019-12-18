import { Controller, Get, Query, Res, Next } from "@nestjs/common";
import { CommonService } from "../service/common.service";
import { QuerySourceDTO } from "../dto/query-source.dto";
import { Response } from 'express';

@Controller('v1/app/common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('/source')
  async getSource(@Query() query: QuerySourceDTO, @Res() response: Response): Promise<{}> {
    await this.commonService.getSource(query).then((res: any) => {
      response.send({
        code: 200,
        data: res,
        message: 'SUCCESS'
      })
    }).catch(error => {
      response.send({
        code: 500,
        data: null,
        message: error
      })
    })
    response.end()
    return null
  }

  @Get('/download')
  async download(@Query() query: QuerySourceDTO, @Res() response: Response): Promise<{}> {
    let random = Math.random().toString(16).substring(2, 8)
    let fileName = `${random}-${query.sourceId}.mp3`
    response.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename=' + fileName,
    })
    await this.commonService.getSource(query).then(res => {
      response.send({
        code: 200,
        data: res,
        message: 'SUCCESS'
      })
    }).catch(error => {
      response.send({
        code: 500,
        data: null,
        message: error
      })
    })
    response.end()
    return null
  }

}