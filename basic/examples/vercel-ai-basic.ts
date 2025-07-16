import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const { text } = await generateText({
  model: openai("gpt-4o-mini"),
  messages: [
    {
      role: "system",
      content: "Please answer in the thai language",
    },
    {
      role: "user",
      content: "hello",
    },
  ],
  /** เขียนได้หลายวิธี */
  // system: "Please answer in the thai language" 
  // prompt: "hello"
});

console.log(text);
