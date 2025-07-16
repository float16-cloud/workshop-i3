import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import z from "zod";

const { text } = await generateText({
  model: openai("gpt-4o-mini"),
  tools: {
    multiply: {
      description: "Multiply two numbers.",
      parameters: z.object({
        a: z.number().describe("First number"),
        b: z.number().describe("Second number"),
      }),
      execute: async ({ a, b }) => ({
        result: a * b,
      }),
    },
  },
  prompt: "คูณ 45646544 กับ 789789789",
  maxSteps: 5,
});

console.log(text);
