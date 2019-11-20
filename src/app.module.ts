import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
// find
import { FindController } from './controller/find.controller';
import { FindService } from './service/find.service';

@Module({
  imports: [],
  controllers: [AppController, FindController],
  providers: [AppService, FindService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'find', method: RequestMethod.ALL })
  }
}
