import { config as c } from "dotenv";
c();

const _config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  cors_origin: process.env.CORS_ORIGIN,
  mongo_uri: process.env.MONGO_CONNECTION_STRING,
  mongo_db_name: process.env.MONGO_DB_NAME,
};

export const config = Object.freeze(_config);
