import OpenAI from "openai";
const client = new OpenAI();

const stream = await client.chat.completions.create({
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
  stream: true,
});

for await (const chunk of stream) {
  /** full body */ 
  // console.log(chunk);
  /** เฉพาะ content */
  console.log(chunk.choices[0].delta);
  console.log("****************");
}
