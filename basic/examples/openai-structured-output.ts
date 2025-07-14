import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const client = new OpenAI();

// https://platform.openai.com/docs/guides/structured-outputs?api-mode=chat

// Define Zod schema for employee data
const EmployeeSchema = z.object({
  name: z.string(),
  age: z.number().int(),
  department: z.string(),
  skills: z.array(z.string()),
});

const EmployeeListSchema = z.object({
  employees: z.array(EmployeeSchema),
});

const response = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "user",
      content: "สร้างข้อมูลพนักงาน 3 คน",
    },
  ],
//   response_format: {
//     type: "json_schema",
//     json_schema: {
//       name: "employee_list",
//       strict: true,
//       schema: {
//         type: "object",
//         properties: {
//           employees: {
//             type: "array",
//             items: {
//               type: "object",
//               properties: {
//                 name: { type: "string" },
//                 age: { type: "integer" },
//                 department: { type: "string" },
//                 skills: {
//                   type: "array",
//                   items: { type: "string" },
//                 },
//               },
//               required: ["name", "age", "department", "skills"],
//               additionalProperties: false,
//             },
//           },
//         },
//         required: ["employees"],
//         additionalProperties: false,
//       },
//     },
//   },
  response_format: zodResponseFormat(EmployeeListSchema, "employee_list"),
});

const content = response.choices[0].message.content;
if (content) {
  console.log(JSON.stringify(JSON.parse(content), null, 2));
}
