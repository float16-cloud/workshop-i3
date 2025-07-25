import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { azure } from './config';

const { object } = await generateObject({
  model: azure("gpt-4o-mini"),
  schema: z.object({
    recipe: z.object({
      name: z.string(),
      ingredients: z.array(z.object({ name: z.string(), amount: z.string() })),
      steps: z.array(z.string()),
    }),
  }),
  messages: [
    {
      role: "user",
      content: "Generate a lasagna recipe.",
    },
  ],
});

console.log(object);
