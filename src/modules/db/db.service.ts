import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { InternalException as CustomInternalException } from '@shared';
import { environment } from '@env';

@Injectable()
export class DbService {
  private readonly pool;

  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 100,
      host: environment.db.host,
      user: environment.db.username,
      password: environment.db.password,
      database: environment.db.database,
    });
  }

  public async query(queryString: string): Promise<any[]> {
    try {
      const connection = await this.pool.getConnection();
      const result = await Promise.all([connection.execute(queryString)]);
      connection.release();
      return result[0][0];
    } catch (error) {
      throw new CustomInternalException(error.message);
    }
  }
}
