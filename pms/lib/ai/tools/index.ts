import { Tool } from "ai";
import { execute_sql_query } from "./execute-sql-query";

export const sqlTools: Record<string, Tool> = {
  // get_database_schema, ไม่ได้ใช้เพราะเอา schema ใส่ที่ prompt เลย
  execute_sql_query,
};
