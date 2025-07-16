import { tool } from "ai";
import { databaseSchemas } from "../prompts/schema";
import z from "zod";

type SchemaResult = {
  schema: string;
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

export const get_database_schema = tool({
  description:
    "Get the complete database schema including all tables and their relationships",
  parameters: z.object({}),
  execute: getDatabaseSchema,
});
