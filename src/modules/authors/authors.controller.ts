import {
  Author, AuthorUpdate,
  InternalException as CustomInternalException,
  KnownException,
  Response
} from '@shared';
import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Controller('author')
class AuthorsController {
  /**
   * Logger
   */
  private readonly l = new Logger('AuthorsController', true);

  /**
   * Inject dependencies
   */
  constructor(private readonly authorsService: AuthorsService) {}

  /**
   * Get authors list
   */
  @Get()
  public async getAuthorsList(): Promise<Response> {
    try {
      return await this.authorsService.getAuthorsList();
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error);
    }
  }

  /**
   * Get author
   */
  @Get(':id')
  public async getDetails(@Param() params: { id: number }): Promise<Response> {
    try {
      const { id } = params;
      return await this.authorsService.getDetails(id);
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error);
    }
  }

  /**
   * Add author
   */
  @Post()
  public async add(@Body() body: Author): Promise<Response> {
    try {
      const { name, sex, pseudonym } = body;
      return await this.authorsService.add(name, sex, pseudonym);
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error);
    }
  }

  /**
   * Update author details
   */
  @Patch(':id')
  public async updateDetails(@Param() params: { id: number }, @Body() body: AuthorUpdate): Promise<Response> {
    try {
      const { id } = params;
      const { name, sex, pseudonym } = body;
      return await this.authorsService.update(id, name, sex, pseudonym);
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error);
    }
  }

  /**
   * Delete author
   */
  @Delete(':id')
  public async delete(@Param() params: { id: number }): Promise<Response> {
    try {
      const { id } = params;
      return await this.authorsService.delete(id);
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error);
    }
  }
}

export { AuthorsController };
