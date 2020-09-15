import { Injectable, Logger } from '@nestjs/common';
import { InternalException as CustomInternalException, Errors, KnownException, Response } from '@shared';
import { DbService } from '../db';

@Injectable()
class BooksService {
  /**
   * Logger instance
   */
  private readonly l = new Logger('BookstService', true);

  /**
   * Inject dependencies
   */
  constructor(private readonly db: DbService) {}

  /**
   * Get books list
   */
  public async getBooksList(): Promise<Response> {
    try {
      const result = await this.db.query(`SELECT * FROM BookTable;`);
      return new Response({ message: 'ok', data: result, status: true });
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error.message);
    }
  }

  /**
   * Get book details
   */
  public async getDetails(id: number): Promise<Response> {
    try {
      /**
       * Check if book exists
       */
      const book = await this.db.query(`SELECT * FROM BookTable WHERE id = ${id};`);
      if (!book.length) {
        throw new KnownException(Errors[1000].code);
      }
      return new Response({ message: 'ok', data: book[0], status: true });
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error.message);
    }
  }

  /**
   * Add book to the library
   */
  public async add(name: string, description: string, authorId: number): Promise<Response> {
    try {
      /**
       * Check if author exists
       */
      const author = await this.db.query(`SELECT * FROM AuthorTable WHERE id = ${authorId};`);
      if (!author.length) {
        throw new KnownException(Errors[1002].code);
      }
      /**
       * Check if book already exists
       */
      const bookExists = await this.db.query(`SELECT * FROM BookTable WHERE (author_id = ${authorId} AND name = '${name}');`);
      if (bookExists.length) {
        throw new KnownException(Errors[1001].code);
      }
      await this.db.query(
        `INSERT INTO BookTable (name, description, author_id ) VALUES ('${name}', '${description}', ${authorId});`,
      );
      return new Response({ message: 'ok', status: true });
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error.message);
    }
  }

  /**
   * Update book details
   */
  public async update(id: number, name: string, description: string, authorId: number): Promise<Response> {
    try {
      /**
       * Check if book exists
       */
      const bookExists = await this.db.query(`SELECT * FROM BookTable WHERE id = ${id};`);
      if (!bookExists.length) {
        throw new KnownException(Errors[1000].code);
      }
      if (name) await this.db.query(`UPDATE BookTable SET name='${name}' WHERE id=${id};`);
      if (description) await this.db.query(`UPDATE BookTable SET description='${description}' WHERE id=${id};`);
      if (authorId) {
        /**
         * Check if author exists
         */
        const author = await this.db.query(`SELECT * FROM AuthorTable WHERE id = ${authorId};`);
        if (!author.length) {
          throw new KnownException(Errors[1002].code);
        }
        await this.db.query(`UPDATE BookTable SET author_id=${authorId} WHERE id=${id};`);
      }

      return new Response({ message: 'ok', status: true });
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error.message);
    }
  }

  /**
   * Delete book from library
   */
  public async delete(id: number): Promise<Response> {
    try {
      /**
       * Check if book exists
       */
      const bookExists = await this.db.query(`SELECT * FROM BookTable WHERE id = ${id};`);
      if (!bookExists.length) {
        throw new KnownException(Errors[1000].code);
      }
      await this.db.query(`DELETE FROM BookTable WHERE id = ${id};`);
      return new Response({ message: 'ok', status: true });
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error.message);
    }
  }
}

export { BooksService };
