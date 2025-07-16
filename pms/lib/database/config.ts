import sql from "mssql";

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

