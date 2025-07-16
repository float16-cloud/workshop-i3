import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const { object } = await generateObject({
  model: openai("gpt-4o-mini"),
  schema: z.object({
    todoList: z.object({
      date: z.string(),
      tasks: z.array(
        z.object({
          task: z.string(),
          done: z.boolean(),
        })
      ),
    }),
  }),
  messages: [
    {
      role: "user",
      content: "Generate a simple todo list for today.",
    },
  ],
});

console.log(object);

/**
 * 
 * {
  "todoList": {
    "date": "2024-06-09",
    "tasks": [
      { "task": "Check emails", "done": false },
      { "task": "Attend team meeting", "done": false },
      { "task": "Write project report", "done": false },
      { "task": "Go for a walk", "done": false }
    ]
  }
}
 */
