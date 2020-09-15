import { ArgumentsHost, Catch, ExceptionFilter, InternalServerErrorException } from '@nestjs/common';
import { InternalException as CustomInternalException, LogicException, Response } from '@shared';
import { Response as response } from 'express';

@Catch(InternalServerErrorException, CustomInternalException)
class InternalServerErrorExceptionFilter implements ExceptionFilter {
  /**
   * Catch auth exception instance
   */
  public catch(
    exception: LogicException | InternalServerErrorException | CustomInternalException,
    host: ArgumentsHost,
  ): response<Response> {
    const res = host.switchToHttp().getResponse<response>();

    return res.status(500).send(
      new Response({
        message: exception.message,
        status: false,
        errors: exception instanceof LogicException && exception.source,
        code: 1001,
      }),
    );
  }
}

export { InternalServerErrorExceptionFilter };
