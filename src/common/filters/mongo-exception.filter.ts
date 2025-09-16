import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';
import { toTitleCase } from '../utils/string.util';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception.code === 11000) {
      status = HttpStatus.CONFLICT;
      
      const e: any = exception;
      const field = Object.keys(e?.keyValue || {})[0];
      const value = e?.keyValue?.[field];

      message = `${toTitleCase(field)} '${value}' đã tồn tại`;
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}