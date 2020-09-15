import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Module } from '@nestjs/common';
import { DbModule } from '../db';

@Module({
  imports: [DbModule],
  controllers: [BooksController],
  providers: [BooksService],
})
class BooksModule {}

export { BooksModule };
