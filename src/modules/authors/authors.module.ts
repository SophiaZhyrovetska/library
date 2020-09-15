import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { Module } from '@nestjs/common';
import { DbModule } from '../db';

@Module({
  imports: [DbModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
class AuthorsModule {}

export { AuthorsModule };
