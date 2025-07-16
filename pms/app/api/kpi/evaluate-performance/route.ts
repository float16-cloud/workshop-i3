import { EvalulateForm } from "@/app/types";
import { azure } from "@/lib/ai/providers/azure";
import { generateObject } from "ai";
import { openai } from '@ai-sdk/openai';

import { z } from "zod";

export type EvaluatePerformanceaRequest = {
  data: (EvalulateForm)[];
};

export type EvaluatePerformanceaResponse = {
  id:string;
  evaluationScore: number;
  explanation?: string;
}[];

export async function POST(req: Request) {
  const body: EvaluatePerformanceaRequest = await req.json();
  const { data } = body;

  const model = azure("o3-mini");

  const { object } = await generateObject({
    output: "array",
    schema: z.object({
      id: z.string().describe("The id of the KPI"),
      evaluationScore: z.number(),
      explanation: z.string(), // explanation for the score
    }),
    model,
    prompt: `
    You are a helpful assistant that evaluates the performance of a user based on their evaluation result.
    ${JSON.stringify(data)}

    Calculate the evaluationScore from the actual performance (evaluationResult) based on the provided indicatorName, unit, target, and criteria.
    Also provide an explanation for the given evaluationScore in the explanation field.

    ในกรณี unit เป็นระยะเวลา format ของปีจะเป็นพุทธศักราช
    `,
  });

  return Response.json(object, { status: 200 });
}
