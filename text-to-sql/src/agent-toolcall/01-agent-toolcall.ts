import { generateObject, generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import sql from "mssql";
import z from "zod";
import { databaseSchemas } from "../agent-basic/schema";

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

// SQL Server configuration
const sqlConfig = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  server: process.env.SQL_SERVER!,
};

// Tool definitions
const getDatabaseSchema = async (): Promise<SchemaResult> => {
  console.log(`\n🔧 Tool Call: get_database_schema`);
  console.log(`Arguments: {}`);
  console.log(`Executing...`);
  
  const result = {
    schema: databaseSchemas,
    message: "Database schema retrieved successfully"
  };
  
  console.log(`Tool Result: get_database_schema`);
  console.log(`Schema retrieved successfully`);
  console.log(``);
  
  return result;
};

const executeSqlQuery = async ({ query }: { query: string }): Promise<QueryResult> => {
  console.log(`\n🔧 Tool Call: execute_sql_query`);
  console.log(`Arguments: { query: "${query}" }`);
  console.log(`Executing...`);
  
  // Validate that it's a SELECT query
  if (!query.trim().toLowerCase().startsWith('select')) {
    throw new Error("Only SELECT queries are allowed for safety");
  }

  try {
    // Connect to SQL Server and execute the query
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query(query);
    
    const result = {
      results: recordset,
      rowCount: recordset.length,
      message: "Query executed successfully"
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
    throw new Error(`SQL execution failed: ${error.message}`);
  }
};

const runTextToSqlAgent = async () => {
  // Provider adapter
  const openai = createOpenAI({
    baseURL: process.env.OPENAI_BASE_API,
    apiKey: process.env.OPENAI_API_KEY,
  });

  const model = openai("gpt-4o-mini");

  const maxRowLimit = 100;

  const systemPrompt = `
You are a SQL expert specializing in Microsoft SQL Server. Generate safe, efficient SELECT queries based on natural language questions.

AVAILABLE TOOLS:
1. get_database_schema - Get the complete database schema
2. execute_sql_query - Execute a SQL query (SELECT only)

WORKFLOW:
1. When a user asks a question, first use get_database_schema to understand the database structure
2. Generate an appropriate SQL query based on the user's question
3. Use execute_sql_query to run the query and get results
4. Provide a natural language answer based on the query results

STRICT RULES:
- ONLY generate SELECT queries for safety
- NO INSERT, UPDATE, DELETE, DROP, CREATE, ALTER, or TRUNCATE operations
- Use proper JOIN syntax for related tables
- Include TOP clause to limit results (max ${maxRowLimit} rows)
- Use square brackets for table/column names if needed
- Always validate your SQL syntax
- If you receive an error message, analyze it and fix the SQL query accordingly

RESPONSE FORMAT:
- Use the tools as needed
- Provide a natural language answer based on the query results
- If there are any issues, explain them clearly
`;

  const userQuestion = "Show me all products with their category names and prices";

  console.log("🤖 Text-to-SQL Agent Starting...");
  console.log(`📝 User Question: ${userQuestion}`);
  console.log("");

  try {
    // Use generateText with tools
    const { text } = await generateText({
      model,
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userQuestion
        }
      ],
      tools: {
        get_database_schema: {
          description: "Get the complete database schema including all tables and their relationships",
          parameters: z.object({}),
          execute: getDatabaseSchema
        },
        execute_sql_query: {
          description: "Execute a SQL query and return the results. Only SELECT queries are allowed for safety.",
          parameters: z.object({
            query: z.string().describe("The SQL query to execute (SELECT only)")
          }),
          execute: executeSqlQuery
        }
      }
    });

    console.log("=== Final Answer ===");
    console.log(text);
    console.log("");
    console.log("🎉 Agent completed successfully!");

  } catch (error: any) {
    console.error("Error:", error.message);
    console.error("Agent failed to complete the task");
  }
};

// Run the agent
runTextToSqlAgent(); 