import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import z from "zod";
import { databaseSchemas } from "./schema";

export const generateTextToSql = async () => {
  // provider adapter
  const openai = createOpenAI({
    baseURL: process.env.OPENAI_BASE_API,
    apiKey: process.env.OPENAI_API_KEY,
  });

  const model = openai("gpt-4o-mini");

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
