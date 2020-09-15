import {
  Book,
  BookUpdate,
  InternalException as CustomInternalException,
  KnownException,
  Response
} from '@shared';
import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('book')
class BooksController {
  /**
   * Logger
   */
  private readonly l = new Logger('BooksController', true);

  /**
   * Inject dependencies
   */
  constructor(private readonly booksService: BooksService) {}

  /**
   * Get books list
   */
  @Get()
  public async getBooksList(): Promise<Response> {
    try {
      return await this.booksService.getBooksList();
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error);
    }
  }

  /**
   * Get book
   */
  @Get(':id')
  public async getDetails(@Param() params: { id: number }): Promise<Response> {
    try {
      const { id } = params;
      return await this.booksService.getDetails(id);
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error);
    }
  }

  /**
   * Add book to library
   */
  @Post()
  public async add(@Body() body: Book): Promise<Response> {
    try {
      const { name, description, authorId } = body;
      return await this.booksService.add(name, description, authorId);
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error);
    }
  }

  /**
   * Update book details
   */
  @Patch(':id')
  public async updateDetails(@Param() params: { id: number }, @Body() body: BookUpdate): Promise<Response> {
    try {
      const { id } = params;
      const { name, description, authorId } = body;
      return await this.booksService.update(id, name, description, authorId);
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error);
    }
  }

  /**
   * Delete book from library
   */
  @Delete(':id')
  public async delete(@Param() params: { id: number }): Promise<Response> {
    try {
      const { id } = params;
      return await this.booksService.delete(id);
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error);
    }
  }
}

export { BooksController };
