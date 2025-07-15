import { generateText } from "ai";
import { azure } from "../agent-basic/config";
import { metaData, systemPrompt } from "./prompt";
import { tools } from "./tools";
import { databaseSchemas } from "../agent-basic/schema";

const runTextToSqlAgent = async () => {
  // provider adapter
  const model = azure("gpt-4o-mini");

  const input = (question: string) => `
DATABASE SCHEMA:
${databaseSchemas}

META DATA:
${metaData}

User Query:
${question}
`;

  console.log("🤖 Text-to-SQL Agent Starting...");
  console.log("");

  try {
    const { text } = await generateText({
      model,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: input("Details of users in the `tbPMSUser`"),
        },
      ],

      tools: tools,
      maxSteps: 10,
    });

    console.log("=== Final Answer ===");
    console.log(text);
    console.log("================================================");
    console.log("🎉 Agent completed successfully!");
  } catch (error: any) {
    console.error("Error:", error.message);
    console.error("Agent failed to complete the task");
  }
};

// Run the agent
runTextToSqlAgent();
