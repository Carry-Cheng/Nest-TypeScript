import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Response, Request } from "express";
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.info('HttpExceptionFilter......')
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    console.info(exception)
    const status = exception.getStatus()
    response
      .status(status)
      .json({
        message: exception.getResponse(),
        code: status,
        timestamp: new Date().toISOString(),
        path: request.url
      })
  }
}
