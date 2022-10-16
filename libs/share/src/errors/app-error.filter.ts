import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

import { AppError, AppErrorCode, HttpStatusMapping } from '.';

const showServerError = process.env.NODE_ENV !== 'prod';

@Catch()
export class AppErrorExceptionFilter implements ExceptionFilter {
  catch(error: AppError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const err = error as any;
    console.log(error.stack);
    const {
      abbr = 'UNKNOWN',
      msg = showServerError ? error?.message : 'Unknown',
      params = {},
    } = err;

    const appError = AppErrorCode;
    const errorCode =
      appError[abbr] ?? AppErrorCode[abbr] ?? AppErrorCode.UNKNOWN;
    const statusCode = (HttpStatusMapping as any)[abbr as string] ?? 200;

    response.status(statusCode).json({
      errorCode,
      abbr,
      msg,
      params,
    });
  }
}
