/**
 * Base class for all know exception
 */
class BaseException {
  /**
   * Message of the exception
   */
  public message: string;

  /**
   * HTTP code
   */
  public code: number;

  /**
   * Status of operation
   */
  public status: boolean;

  constructor({ message, code, status }) {
    this.message = message;
    this.code = code;
    this.status = status;
  }
}

export { BaseException };
