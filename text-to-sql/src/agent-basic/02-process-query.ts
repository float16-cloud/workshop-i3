import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import sql from "mssql";
import { generateTextToSql } from "./01-generate-sql";

const processQuery = async () => {
  // provider adapter
  const openai = createOpenAI({
    baseURL: process.env.OPENAI_BASE_API,
    apiKey: process.env.OPENAI_API_KEY,
  });

  const model = openai("gpt-4o-mini");

  const sqlConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    server: process.env.SQL_SERVER!,
  };

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
