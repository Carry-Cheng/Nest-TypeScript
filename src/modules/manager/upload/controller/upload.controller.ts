import { Controller, Post, Body, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadService } from "../service/upload.service";

@Controller('v1/manager/upload')
export class ManagerUploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/uploadMusic')
  @UseInterceptors(FileInterceptor('file'))
  uploadMusic(@UploadedFile() file): void {
    console.info(file)
  }

}