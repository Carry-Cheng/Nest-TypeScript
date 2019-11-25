import { Controller, Post } from "@nestjs/common";

@Controller('api/manager/music')
export class ManagerMusicController {
  constructor() {}
  @Post('/createMusic')
  createMusic(): void {
    
  }
}
