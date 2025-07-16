import z from "zod";
import sql from "mssql";
import { tool } from "ai";
import { sqlConfig } from "@/lib/database/config";

type QueryResult = {
  results: any[];
  rowCount: number;
  message: string;
};

export const executeSqlQuery = async ({
  query,
}: {
  query: string;
  // explanation: string;
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
    console.log(`Result:`, result);
    console.log(``);

    return result;
  } catch (error: any) {
    console.log(`❌ Tool Error: execute_sql_query`);
    console.log(`Error: ${error.message}`);
    console.log(``);
    return {
      results: [],
      rowCount: 0,
      message: `SQL execution failed: ${error.message}`,
    };
    // throw new Error(`SQL execution failed: ${error.message}`);
  }
};

export const execute_sql_query = tool({
  description:
    "Execute a SQL query and return the results. Only SELECT queries are allowed for safety.",
  parameters: z.object({
    query: z.string().describe("The SQL query to execute (SELECT only)"),
  }),
  execute: executeSqlQuery,
});
