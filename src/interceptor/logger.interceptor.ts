import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    console.log('Before...')
    const now = Date.now()
    return next
      .handle()
      .pipe(
        tap(() => console.info(`After...${ Date.now() - now }ms`))
      )
  }
}
