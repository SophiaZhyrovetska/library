import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
class KnownException extends BaseExceptionFilter {
  /**
   * Code mapping
   */
  public code: number;

  /**
   * Meta information from the orogin of error
   */
  public description: string;

  /**
   * Extend this
   */
  constructor(code: number, description?: string) {
    super();
    this.code = code;
    this.description = description;
  }

  public catch(exception: unknown, host: ArgumentsHost): void {
    super.catch(exception, host);
  }
}

export { KnownException };
