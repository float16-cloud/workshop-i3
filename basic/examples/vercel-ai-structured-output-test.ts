
import { generateObject } from "ai";
import { z } from "zod";
import { azure } from "./config";

const { object } = await generateObject({
  model: azure("gpt-4o-mini"),
  schema: z.object({}),
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
