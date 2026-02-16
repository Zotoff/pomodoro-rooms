import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { log } from './logger';
  
  @Catch()
  export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const req = ctx.getRequest();
      const res = ctx.getResponse();
  
      const requestId = req?.requestId;
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const payload =
        exception instanceof HttpException
          ? exception.getResponse()
          : { message: 'Internal Server Error' };
  
      const body = {
        requestId,
        statusCode: status,
        ...(typeof payload === 'string' ? { message: payload } : payload),
      };
  
      log('error', 'exception', {
        requestId,
        statusCode: status,
        error: exception?.message,
      });
  
      res.status(status).json(body);
    }
  }
  