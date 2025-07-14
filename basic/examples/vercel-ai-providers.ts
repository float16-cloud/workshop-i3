/* https://ai-sdk.dev/providers/ai-sdk-providers **/

import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
/* other providers **/
// import { anthropic } from '@ai-sdk/anthropic';
// import { azure } from '@ai-sdk/azure';

// const azure = createAzure({
//   resourceName: 'your-resource-name', // Azure resource name
//   apiKey: 'your-api-key',
// });

const openai = createOpenAI({
  baseURL: process.env.OPENAI_BASE_API,
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'compatible',
});


const { text } = await generateText({
  model: openai("gpt-4o-mini"),
  // model: anthropic("claude-3-5-sonnet-20240620"), 
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
