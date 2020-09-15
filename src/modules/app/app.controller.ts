import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  /**
   * Logger instance
   */
  private readonly l = new Logger('AppService', true);

  constructor(private readonly appService: AppService) {}
}
