import { generateObject } from "ai";
import z from "zod";
import { databaseSchemas } from "./schema";
import { azure } from "./config";

export const generateTextToSql = async () => {
  // provider adapter
  const model = azure("gpt-4o-mini");

  // When passing all data to LLM for processing, we need to set limits to prevent excessive token usage
  const maxRowLimit = 100;

  const systemPrompt = `
You are a SQL expert specializing in Microsoft SQL Server. Generate safe, efficient SELECT queries based on natural language questions.

STRICT RULES:
- ONLY generate SELECT queries
- NO INSERT, UPDATE, DELETE, DROP, CREATE, ALTER, or TRUNCATE operations
- Use proper JOIN syntax for related tables
- Include TOP clause to limit results (max ${maxRowLimit} rows)
- Use square brackets for table/column names if needed
- Always validate your SQL syntax

RESPONSE FORMAT:
- query: The complete SQL query
  `;

  const prompt = (question: string) => `
DATABASE SCHEMA:
${databaseSchemas}

META DATA: //

User Query:
${question}
`;

  const input = "Show me all products with their prices";

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
    ],
  });
  console.log(object);
  return {
    input,
    sqlQuery: object.query,
  };
};

generateTextToSql();
