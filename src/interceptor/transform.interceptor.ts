
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Response<T> {
  code: Number,
  data: T,
  message: String
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    console.info('TransformInterceptor')
    return next.handle().pipe(map(data => ({
      code: 200,
      data,
      message: 'SUCCESS'
    })))
  }
}