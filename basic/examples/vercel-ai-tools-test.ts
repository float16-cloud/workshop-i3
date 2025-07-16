import { generateText } from "ai";
import { azure } from "./config";

const { text } = await generateText({
  model: azure("gpt-4o-mini"),
  tools: {},
  prompt: "คูณ 45646544 กับ 789789789",
  maxSteps: 5,
});

console.log(text);
