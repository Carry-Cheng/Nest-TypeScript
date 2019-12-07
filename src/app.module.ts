import { HttpExceptionFilter } from 'src/filters/HttpExceptionFilter';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
// 所有模块
import { ApplicationModule } from './modules/application.module';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ApplicationModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'find', method: RequestMethod.ALL })
  }
}
