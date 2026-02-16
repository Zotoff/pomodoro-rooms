import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, tap } from 'rxjs';
  import { log } from './logger';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const now = Date.now();
      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();
  
      const requestId = req?.requestId;
      const method = req?.method;
      const url = req?.originalUrl || req?.url;
  
      log('info', 'http_request', { requestId, method, url });
  
      return next.handle().pipe(
        tap({
          next: () => {
            log('info', 'http_response', {
              requestId,
              method,
              url,
              statusCode: res?.statusCode,
              durationMs: Date.now() - now,
            });
          },
          error: (err) => {
            log('error', 'http_error', {
              requestId,
              method,
              url,
              statusCode: res?.statusCode,
              durationMs: Date.now() - now,
              error: err?.message,
            });
          },
        }),
      );
    }
  }
  