/* https://ai-sdk.dev/providers/ai-sdk-providers **/

import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
/* other providers **/
// import { anthropic } from '@ai-sdk/anthropic';
import { createAzure } from '@ai-sdk/azure';

// const openai = createOpenAI({
//   baseURL: process.env.OPENAI_BASE_API,
//   apiKey: process.env.OPENAI_API_KEY,
//   compatibility: 'compatible',
// });

export const azure =  createAzure({
  baseURL: process.env.AZURE_BASE_API,
  apiKey: process.env.AZURE_API_KEY,
  apiVersion: process.env.API_VERSION
})


const { text } = await generateText({
  // model: openai("gpt-4o-mini"),
  // model: anthropic("claude-3-5-sonnet-20240620"), 
  model: azure("gpt-4o-mini"),
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
});

console.log(text);
