import { Controller, Post } from "@nestjs/common";

@Controller('api/manager')
export class ManagerMusicController {
  constructor() {}
  @Post('/createMusic')
  createMusic(): void {
    
  }
}
