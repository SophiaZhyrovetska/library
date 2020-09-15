import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Logger instance
   */
  private readonly l = new Logger('AppService', true);

  /**
   * Inject dependencies
   */
  constructor() {}
}
