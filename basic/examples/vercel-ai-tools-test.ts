import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import z from "zod";

const { text } = await generateText({
  model: openai("gpt-4o-mini"),
  tools: {},
  prompt: "คูณ 45646544 กับ 789789789",
  maxSteps: 5,
});

console.log(text);
