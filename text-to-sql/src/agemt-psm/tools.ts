import z from "zod";
import { sqlConfig } from "../agent-basic/config";
import { databaseSchemas } from "../agent-basic/schema";
import sql from "mssql";
import { Tool, tool } from "ai";

// Type definitions for tool results
type SchemaResult = {
  schema: string;
  message: string;
};

type QueryResult = {
  results: any[];
  rowCount: number;
  message: string;
};

// Tool definitions
const getDatabaseSchema = async (): Promise<SchemaResult> => {
  console.log(`\n🔧 Tool Call: get_database_schema`);
  console.log(`Arguments: {}`);
  console.log(`Executing...`);

  const result = {
    schema: databaseSchemas,
    message: "Database schema retrieved successfully",
  };

  console.log(`Tool Result: get_database_schema`);
  console.log(`Schema retrieved successfully`);
  console.log(``);

  return result;
};

const executeSqlQuery = async ({
  query,
}: {
  query: string;
}): Promise<QueryResult> => {
  console.log(`\n🔧 Tool Call: execute_sql_query`);
  console.log(`Arguments: { query: "${query}" }`);
  console.log(`Executing...`);

  // Validate that it's a SELECT query
  if (!query.trim().toLowerCase().startsWith("select")) {
    throw new Error("Only SELECT queries are allowed for safety");
  }

  try {
    // Connect to SQL Server and execute the query
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query(query);

    const result = {
      results: recordset,
      rowCount: recordset.length,
      message: "Query executed successfully",
    };

    console.log(`Tool Result: execute_sql_query`);
    console.log(`Query executed, returned ${result.rowCount} rows`);
    // console.log(`Result:`, result);
    console.log(``);

    return result;
  } catch (error: any) {
    console.log(`❌ Tool Error: execute_sql_query`);
    console.log(`Error: ${error.message}`);
    console.log(``);
    throw new Error(`SQL execution failed: ${error.message}`);
  }
};

// const getMetaByTableData = async (table: string): Promise<any> => {
//   console.log(`\n🔧 Tool Call: get_meta_data`);
//   console.log(`Arguments: {}`);
//   console.log(`Executing...`);

//   console.log(`Tool Result: get_meta_data`);
//   console.log(`Meta data retrieved successfully`);
//   console.log(``);

//   return {};
// };

export const tools: Record<string, Tool> = {
  // get_database_schema: tool({
  //   description:
  //     "Get the complete database schema including all tables and their relationships",
  //   parameters: z.object({}),
  //   execute: getDatabaseSchema,
  // }),
  execute_sql_query: tool({
    description:
      "Execute a SQL query and return the results. Only SELECT queries are allowed for safety.",
    parameters: z.object({
      query: z.string().describe("The SQL query to execute (SELECT only)"),
    }),
    execute: executeSqlQuery,
  }),
};
