import { Controller, Post, Body, UseInterceptors, UploadedFile, HttpException, HttpStatus } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadService } from "../service/upload.service";
import { UploadDTO } from "../dto/upload.dto";
import { Observable, of } from "rxjs";

@Controller('v1/manager/upload')
export class ManagerUploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/music')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMusic(@UploadedFile() file, @Body() uploadDTO: UploadDTO): Promise<any> {
    return this.uploadService.uploadMusic(file, uploadDTO)
  }

  @Post('/lyric')
  @UseInterceptors(FileInterceptor('file'))
  uploadLyric(@UploadedFile() file, @Body() uploadDTO: UploadDTO): void {
    this.uploadService.uploadLyric(file, uploadDTO)
  }

}