import { Injectable, Logger } from '@nestjs/common';
import { InternalException as CustomInternalException, Errors, KnownException, Response, Sex } from '@shared';
import { DbService } from '../db';

@Injectable()
class AuthorsService {
  /**
   * Logger instance
   */
  private readonly l = new Logger('AuthorsService', true);

  /**
   * Inject dependencies
   */
  constructor(private readonly db: DbService) {}

  /**
   * Get authors list
   */
  public async getAuthorsList(): Promise<Response> {
    try {
      const result = await this.db.query(`SELECT * FROM AuthorTable;`);
      return new Response({ message: 'ok', data: result, status: true });
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error.message);
    }
  }

  /**
   * Get author details
   */
  public async getDetails(id: number): Promise<Response> {
    try {
      /**
       * Check if author exists
       */
      const author = await this.db.query(`SELECT * FROM AuthorTable WHERE id = ${id};`);
      if (!author.length) {
        throw new KnownException(Errors[1002].code);
      }
      return new Response({ message: 'ok', data: author[0], status: true });
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error.message);
    }
  }

  /**
   * Add author
   */
  public async add(name: string, sex: Sex, pseudonym: string): Promise<Response> {
    try {
      /**
       * Check if author already exists
       */
      const author = await this.db.query(`SELECT * FROM AuthorTable WHERE (name='${name}' AND pseudonym='${pseudonym}');`);
      if (author.length) {
        throw new KnownException(Errors[1003].code);
      }
      await this.db.query(`INSERT INTO AuthorTable (name, sex, pseudonym) VALUES ('${name}', '${sex}', '${pseudonym}');`);
      return new Response({ message: 'ok', status: true });
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error.message);
    }
  }

  /**
   * Update author details
   */
  public async update(id: number, name: string, sex: Sex, pseudonym: string): Promise<Response> {
    try {
      /**
       * Check if author exists
       */
      const authorExists = await this.db.query(`SELECT * FROM AuthorTable WHERE id = ${id};`);
      if (!authorExists.length) {
        throw new KnownException(Errors[1002].code);
      }
      if (name) await this.db.query(`UPDATE AuthorTable SET name='${name}' WHERE id=${id};`);
      if (sex) await this.db.query(`UPDATE AuthorTable SET sex='${sex}' WHERE id=${id};`);
      if (pseudonym) await this.db.query(`UPDATE AuthorTable SET pseudonym='${pseudonym}' WHERE id=${id};`);

      return new Response({ message: 'ok', status: true });
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error.message);
    }
  }

  /**
   * Delete author
   */
  public async delete(id: number): Promise<Response> {
    try {
      /**
       * Check if author exists
       */
      const authorExists = await this.db.query(`SELECT * FROM AuthorTable WHERE id = ${id};`);
      if (!authorExists.length) {
        throw new KnownException(Errors[1002].code);
      }
      /**
       * Delete author's books
       */
      await this.db.query(`DELETE FROM BookTable WHERE author_id = ${id};`);

      await this.db.query(`DELETE FROM AuthorTable WHERE id = ${id};`);
      return new Response({ message: 'ok', status: true });
    } catch (error) {
      if (error instanceof KnownException) throw new KnownException(error.code);
      throw new CustomInternalException(error.message);
    }
  }
}

export { AuthorsService };
