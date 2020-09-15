import {KnownExceptionFilter, ValidationExceptionFilter} from "@utils/filters";

if (process.env.config === 'local') {
  require('../env.js');
}
import { AppModule } from '@app';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { DTOValidationPipe } from '@utils/pipes';
import { environment } from '@env';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', true);

  app.enableCors({
    origin: ['http://localhost:8289', environment.api.origin, 'http://localhost:8288'],
    credentials: true,
  });

  const l = new Logger('bootstrap', true);

  app.setGlobalPrefix('v1');

  /**
   * Use global validation pipe
   */
  app.useGlobalPipes(new DTOValidationPipe());

  app.useGlobalFilters(new KnownExceptionFilter(), new ValidationExceptionFilter());

  await app.listen(environment.httpServer.port);

  l.log(`Server started, listening at [${await app.getUrl()}] in [${environment.mode}] environment`);
};

bootstrap();

export { bootstrap };
