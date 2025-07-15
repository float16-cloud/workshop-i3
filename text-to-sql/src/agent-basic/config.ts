import sql from "mssql";
import { createAzure } from '@ai-sdk/azure';

export const sqlConfig: sql.config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  server: process.env.SQL_SERVER!,
  port: parseInt(process.env.SQL_PORT!),
  options: {
    encrypt: false,
    trustServerCertificate: false,
  },
};

export const azure =  createAzure({
  baseURL: process.env.OPENAI_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
  apiVersion: process.env.API_VERSION
})
