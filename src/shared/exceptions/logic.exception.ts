/**
 * Logic exception
 */
class LogicException<M = any> {
  /**
   * Error trace
   */
  private readonly trace: any[] = [];
  /**
   * Exception message
   */
  public message = '';
  /**
   * Error code
   */
  public code: number;
  /**
   * Response status code
   */
  public statusCode = 500;
  /**
   * Exception metadata
   */
  public meta: any = {};
  /**
   * First logic exception for wrapping underling errors
   */
  public get firstLogic() {
    let result = this as LogicException;

    for (const error of this.trace) {
      if (error instanceof LogicException) {
        result = error;
        break;
      }
    }

    return result;
  }
  /**
   * Source exception
   */
  public get source(): any[] {
    const [source] = this.trace;
    return source || this;
  }
  /**
   * Init exception
   */
  public constructor({ meta, error, message, code, statusCode }: ExceptionMeta & M) {
    this.meta = meta || {};
    this.message = message;
    this.code = code;
    this.statusCode = statusCode || 500;
    if (error) this.trace.push(error);
  }
}

type ExceptionMeta = {
  /**
   * Catched exception
   */
  error?: any;
  /**
   * Error message
   */
  message: string;
  /**
   * Exception id
   */
  code?: number;
  /**
   * Response status code
   */
  statusCode?: number;
  /**
   * Error metadata
   */
  meta?: any;
};

export { LogicException };
