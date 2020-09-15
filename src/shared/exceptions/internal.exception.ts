import { BaseException } from './base.exception';

class InternalException extends BaseException {
  /**
   * Init exception
   */
  public constructor({ message = 'Internal server error', code = 1001, status = false }) {
    super({ message, code, status });
    this.message = message;
    this.code = code;
    this.status = status;
  }
}

export { InternalException };
