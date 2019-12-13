import { HttpExceptionFilter } from './filters/HttpExceptionFilter';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
// 所有模块
import { APP_FILTER } from '@nestjs/core';
import { ApplicationModule } from './modules/application.module';
import { ManagerModule } from './modules/manager.module';

@Module({
  imports: [
    ApplicationModule,
    ManagerModule
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
