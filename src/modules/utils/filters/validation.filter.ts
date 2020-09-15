import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response, ValidationException } from '@shared';
import { Response as response } from 'express';

@Catch(ValidationException)
class ValidationExceptionFilter implements ExceptionFilter {
  /**
   * Catch auth exception instance
   */
  public catch(exception: ValidationException, host: ArgumentsHost): response<Response> {
    const res = host.switchToHttp().getResponse<response>();

    return res.status(422).send(
      new Response({
        message: exception.message,
        status: false,
        errors: exception.errors,
        code: exception.code,
      }),
    );
  }
}

export { ValidationExceptionFilter };
