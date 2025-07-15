import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import sql from "mssql";
import { generateTextToSql } from "./01-generate-sql";
import { azure, sqlConfig } from "./config";

const processQuery = async () => {
  // provider adapter
  const model = azure("gpt-4o-mini");

  const { input, sqlQuery } = await generateTextToSql();

  await sql.connect(sqlConfig);
  const result = await sql.query(sqlQuery);

  const { text } = await generateText({
    model,
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that can answer questions about the data.",
      },
      {
        role: "user",
        content: `
        User Query: ${input}
        SQL Query: ${sqlQuery}
        SQL Result: ${JSON.stringify(result)}
        `,
      },
    ],
  });
  console.log(text);
};

processQuery();
