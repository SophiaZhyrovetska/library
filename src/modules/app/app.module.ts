import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '../db';
import { BooksModule } from '../books';
import { AuthorsModule } from '../authors';

@Module({
  imports: [DbModule, BooksModule, AuthorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
