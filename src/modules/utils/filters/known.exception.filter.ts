import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Errors, KnownException, Response } from '@shared';
import { Response as ResponseType } from 'express';

/**
 * Catch all
 */
@Catch(KnownException)
class KnownExceptionFilter implements ExceptionFilter {
  /**
   * Logger instance
   */
  private readonly l = new Logger(KnownExceptionFilter.name, true);
  /**
   * Catch auth exception instance
   */
  public catch(exception: KnownException, host: ArgumentsHost): ResponseType<Response> {
    const res = host.switchToHttp().getResponse<ResponseType>();
    this.l.log(`Code is - [${exception.code}]`);

    /**
     * Default error
     */
    const def = Errors[2];

    const { description } = exception;

    /**
     * Map error to message and http status code
     */
    const error = Errors[exception.code] || def;

    this.l.warn(`Know issue, code - [${exception.code}], message - [${error.text}]`);

    const response = new Response({
      message: error.text,
      code: exception.code,
      status: false,
      errors: description ? [description] : undefined,
    });

    return res.status(error.status).send(response);
  }
}

export { KnownExceptionFilter };
