import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResp =
      exception instanceof HttpException
        ? exception.getResponse()
        : { code: 'INTERNAL_ERROR', message: '서버 내부 오류' };

    if (!(exception instanceof HttpException)) {
      this.logger.error('Unknown error:', exception);
    }
    response.status(status).json(errorResp);
  }
}
