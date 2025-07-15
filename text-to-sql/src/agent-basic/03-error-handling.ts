import { generateObject, generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import sql from "mssql";
import z from "zod";
import { databaseSchemas } from "./schema";
import { azure, sqlConfig } from "./config";

const processQueryWithRetry = async () => {
 // provider adapter
 const model = azure("gpt-4o-mini");

  const maxRowLimit = 100;
  const maxRetries = 3;
  let currentRetry = 0;

  // Helper function to build error history messages
  const buildErrorMessages = (errorHistory: Array<{ query: string; error: string }>) => {
    return errorHistory.reduce((messages, { query, error }) => {
      messages.push(
        {
          role: "assistant" as const,
          content: query,
        },
        {
          role: "user" as const,
          content: `The above SQL query failed with this error: ${error}. Please fix the query.`,
        }
      );
      return messages;
    }, [] as any[]);
  };

  const systemPrompt = `
You are a SQL expert specializing in Microsoft SQL Server. Generate safe, efficient SELECT queries based on natural language questions.

STRICT RULES:
- ONLY generate SELECT queries
- NO INSERT, UPDATE, DELETE, DROP, CREATE, ALTER, or TRUNCATE operations
- Use proper JOIN syntax for related tables
- Include TOP clause to limit results (max ${maxRowLimit} rows)
- Use square brackets for table/column names if needed
- Always validate your SQL syntax
- If you receive an error message, analyze it and fix the SQL query accordingly

RESPONSE FORMAT:
- query: The complete SQL query
  `;

  const prompt = (question: string) => `
DATABASE SCHEMA:
${databaseSchemas}

User Query:
${question}
`;

  const input = "Show me all products with their prices";
  const errorHistory: Array<{ query: string; error: string }> = [];

  while (currentRetry < maxRetries) {
    console.log(`\n--- Attempt ${currentRetry + 1}/${maxRetries} ---`);

    // Step 1: Generate SQL
    console.log("Generating SQL query...");
    let sqlQuery: string;

    try {
      const { object } = await generateObject({
        model,
        schema: z.object({
          query: z.string(),
        }),
        temperature: 0,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: prompt(input),
          },
          ...buildErrorMessages(errorHistory),
        ],
      });

      sqlQuery = object.query;
      console.log("Generated SQL:", sqlQuery);

      // Step 2: Execute SQL
      console.log("Executing SQL query...");
      await sql.connect(sqlConfig);
      const { output } = await sql.query(sqlQuery);
      console.log("SQL executed successfully!");

      // Step 3: Generate natural language response
      console.log("Generating response...");
      const { text } = await generateText({
        model,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that can answer questions about the data.",
          },
          {
            role: "user",
            content: `
            User Query: ${input}
            SQL Query: ${sqlQuery}
            SQL Result: ${JSON.stringify(output)}
            `,
          },
        ],
      });

      console.log("\n=== Final Answer ===");
      console.log(text);
      break; // Success! Exit the retry loop
    } catch (error: any) {
      currentRetry++;
      const errorMessage = error?.message || error;
      console.error(`\n❌ Error on attempt ${currentRetry}:`, errorMessage);

      // Add to error history (only if we have a query)
      if (sqlQuery!) {
        errorHistory.push({
          query: sqlQuery!,
          error: errorMessage,
        });
      }

      if (currentRetry >= maxRetries) {
        console.error("\n💥 Max retries reached. Giving up.");
        console.error("Final error details:", {
          error: errorMessage,
          sqlQuery: sqlQuery! || "No query generated",
          input: input,
          errorHistory: errorHistory,
        });
        break;
      }

      console.log(`🔄 Retrying... (${currentRetry}/${maxRetries})`);
      console.log(`📚 Error history: ${errorHistory.length} previous errors`);

      // Add a small delay before retry
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};

processQueryWithRetry();
