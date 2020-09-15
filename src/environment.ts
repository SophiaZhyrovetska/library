const {
  PORT,
  NODE_ENV,
  DB_URL,
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
  DB_NAME,
  DB_PORT,
  DB_TYPE,
  BASE_URL,
  ORIGIN,
} = process.env;

const environment = {
  mode: NODE_ENV,
  httpServer: {
    port: PORT,
  },
  api: {
    origin: ORIGIN,
    base: BASE_URL,
  },
  db: {
    url: DB_URL,
    host: DB_HOST,
    password: DB_PASSWORD,
    username: DB_USER,
    database: DB_NAME,
    port: DB_PORT,
    type: DB_TYPE,
  },
};

export { environment };
