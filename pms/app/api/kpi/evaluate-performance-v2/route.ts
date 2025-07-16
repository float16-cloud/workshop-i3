import { EvalulateForm } from "@/types";
import { azure } from "@/lib/ai/providers/azure";
import { generateObject } from "ai";
import { z } from "zod";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

export type EvaluatePerformanceaRequest = {
  data: EvalulateForm[];
};

export type EvaluatePerformanceaResponse = {
  id: string;
  evaluationScore: number;
  explanation?: string;
}[];

export async function POST(req: Request) {
  const body: EvaluatePerformanceaRequest = await req.json();
  const { data } = body;

  const model = azure("gpt-4o-mini");

  //** 01 - แบ่งข้อมูลตาม unit */
  const unitDateType = data?.filter(({ unit }) => unit === "ระยะเวลา");
  const unitOtherType = data?.filter(({ unit }) => unit !== "ระยะเวลา");

  //** 02 - แปลงข้อมูล unit ระยะเวลา*/
  const { object: unitDateTypeObject } = await generateObject({
    output: "array",
    model,
    schema: z.object({
      id: z.string().describe("The id of the KPI"),
      evaluationResultDate: z.string(),
      criteriaDate: z.array(
        z.object({
          rating: z.number(),
          date: z.string(),
        })
      ),
      targetDate: z.string(),
    }),
    prompt: `
    ${JSON.stringify(unitDateType)}

    - ข้อมูลที่ให้ไปจะเป็น ปีพุทธศักราช
    - ช่วยดึง datetime ออกมา จาก evaluationResult, criteria และ target ออกมาให้อยู่ในรูปของ DD/MM/YYYY (พุทธศักราช)
    `,
  });

  /**
   * example result
   * [
  {
    "id": "4",
    "evaluationResultDate": "31/03/2568",
    "criteriaDate": [
      {
        "rating": 5,
        "date": "31/01/2567"
      },
      {
        "rating": 4,
        "date": "29/02/2567"
      },
      {
        "rating": 3,
        "date": "31/03/2567"
      },
      {
        "rating": 2,
        "date": "30/04/2567"
      },
      {
        "rating": 1,
        "date": "31/05/2567"
      }
    ],
    "targetDate": "31/03/2567"
  }
]
   */

  console.log("unitDateTypeObject: ", JSON.stringify(unitDateTypeObject))

  /** 03 - นำข้อมูลที่แปลงมาทำ evaluationScore ตามข้อมูลที่ให้ไป */
  // Calculate evaluationScore based on date comparison
  const resultDateType: EvaluatePerformanceaResponse = unitDateTypeObject.map(
    (item: any) => {
      const evaluationDate = dayjs(item.evaluationResultDate, "DD/MM/YYYY");
      let evaluationScore = 1; // Default to lowest score

      // Sort criteria by rating (highest to lowest) to find the best match
      const sortedCriteria = item.criteriaDate.sort(
        (a: any, b: any) => b.rating - a.rating
      );

      for (const criteria of sortedCriteria) {
        const criteriaDate = dayjs(criteria.date, "DD/MM/YYYY");

        if (evaluationDate.isSameOrBefore(criteriaDate)) {
          evaluationScore = criteria.rating;
          break;
        }
      }

      return {
        id: item.id,
        evaluationScore,
      };
    }
  );

  /** 04 - unit type อื่นๆนำข้อมูลที่แปลงมาทำ evaluationScore ตามปกติ */
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
    ${JSON.stringify(unitOtherType)}

    Calculate the evaluationScore from the actual performance (evaluationResult) based on the provided indicatorName, unit, target, and criteria.
    Also provide an explanation for the given evaluationScore in the explanation field.

    ในกรณี unit เป็นระยะเวลา format ของปีจะเป็นพุทธศักราช
    `,
  });

  const result = [...resultDateType, ...object]

  return Response.json(result, { status: 200 });
}
