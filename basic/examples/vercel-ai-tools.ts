import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import z from "zod";
import { azure } from "./config";

const { text } = await generateText({
  model: azure("gpt-4o-mini"),
  tools: {
    weather: tool({
      description: "Get the weather in a location",
      parameters: z.object({
        location: z.string().describe("The location to get the weather for"),
      }),
      execute: async ({ location }) => {
        console.log(`\n🔧 Tool Call: weather`);
        console.log(`Arguments: { location: "${location}" }`);
        console.log(`Executing...`);
        const mockData = {
          location,
          temperature: 72 + Math.floor(Math.random() * 21) - 10, //mock data
        };
        console.log(`Tool Success: weather`);
        console.log(`Tool Result:`, mockData);
        console.log(``);
        return mockData
      },
    }),
  },
  prompt: "What is the weather in San Francisco?",
  maxSteps: 5,
});

console.log(text);
