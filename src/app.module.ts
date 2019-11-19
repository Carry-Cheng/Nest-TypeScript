import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// find
import { FindController } from './controller/find.controller';

@Module({
  imports: [],
  controllers: [AppController, FindController],
  providers: [AppService],
})
export class AppModule {}
