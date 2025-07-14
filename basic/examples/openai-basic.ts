import OpenAI from "openai";
const client = new OpenAI({
  // baseURL: 'https://api.openai.com/v1', // default
});

const response = await client.chat.completions.create({
  model: "gpt-4o-mini",
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
  temperature: 0,
  max_completion_tokens: 1000,
  stream: false,
});

console.log(response.choices[0]);
