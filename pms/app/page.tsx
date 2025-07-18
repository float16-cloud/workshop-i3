"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { EvalulateForm } from "@/types";
import {
  EvaluatePerformanceaRequest,
  EvaluatePerformanceaResponse,
} from "./api/kpi/evaluate-performance/route";
import { initialMockData, initialMockEvaluationResult } from "./mock";

export default function Page() {
  const [userId, setUserId] = useState("F297AA3C-F5E1-4695-93F1-B52AA1BAB5CA");
  const [data, setData] = useState<EvalulateForm[]>(() =>
    initialMockData.map((item, idx) => ({
      ...item,
      evaluationResult: initialMockEvaluationResult[idx] || "",
    }))
  );

  const { mutate: generatePersonalKpi, isPending: isGeneratingPersonalKpi } =
    useMutation({
      mutationFn: (data: string) =>
        axios.post("/api/kpi/generate-personal", {
          wfEmpId: data,
        }),
      onSuccess: ({ data }) => {
        setData(
          data.kpis?.map((item: any, idx: number) => ({
            ...item,
            id: idx + 1,
            evaluationResult: "",
          })) || []
        );
      },
    });
  const { mutate: evaluatePerformance, isPending: isEvaluatingPerformance } =
    useMutation({
      mutationFn: (payload: EvaluatePerformanceaRequest) =>
        axios.post<EvaluatePerformanceaResponse>(
          "/api/kpi/evaluate-performance",
          payload
        ),
      onSuccess: ({ data }) => {
        setData((prevData) =>
          prevData.map((item) => {
            const evaluationData = data.find(
              (evalItem: any) => evalItem.id === item.id
            );
            return {
              ...item,
              evaluationScore: evaluationData?.evaluationScore,
            };
          })
        );
      },
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    generatePersonalKpi(userId);
  };

  const handleEvaluationResultChange = (id: string | number, value: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, evaluationResult: value } : item
      )
    );
  };

  const handleEvaluate = () => {
    evaluatePerformance({
      data: data.map((item) => ({
        ...item,
        evaluationResult: item.evaluationResult || "",
      })),
    });
  };

  return (
    <div className="px-10">
      <div className="bg-white shadow-md border p-8 w-full mx-auto mt-8 rounded-xl">
        <form className="flex items-center gap-2 mb-6" onSubmit={handleSubmit}>
          <input
            type="text"
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter userId..."
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Button type="submit" disabled={isGeneratingPersonalKpi || !userId}>
            {isGeneratingPersonalKpi ? "Loading..." : "Submit"}
          </Button>
        </form>
        <h2 className="text-2xl font-bold mb-6 text-blue-900">แบบประเมิน</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 text-center bg-blue-50 font-semibold border-b-2 border-blue-200 px-4 py-3 rounded-tl-lg">
                  ข้อ
                </TableHead>
                <TableHead className="break-words whitespace-pre-line max-w-sm bg-blue-50 font-semibold border-b-2 border-blue-200 px-4 py-3">
                  ตัวชี้วัดผลงาน
                </TableHead>
                <TableHead className="w-32 bg-blue-50 font-semibold border-b-2 border-blue-200 px-4 py-3 text-center">
                  หน่วยวัด
                </TableHead>
                <TableHead className="w-24 bg-blue-50 font-semibold border-b-2 border-blue-200 px-4 py-3 text-center">
                  น้ำหนัก
                </TableHead>
                <TableHead className="w-32 bg-blue-50 font-semibold border-b-2 border-blue-200 px-4 py-3 text-center">
                  เป้าหมายผลงาน
                </TableHead>
                <TableHead className="bg-blue-50 font-semibold border-b-2 border-blue-200 px-4 py-3">
                  เกณฑ์การวัดผล
                </TableHead>
                <TableHead className="w-56 bg-blue-50 font-semibold border-b-2 border-blue-200 px-4 py-3 text-center">
                  ผลงานที่ทำได้จริง
                </TableHead>
                <TableHead className="w-32 bg-blue-50 font-semibold border-b-2 border-blue-200 px-4 py-3 text-center rounded-tr-lg">
                  ผลการประเมิน
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((item, idx) => (
                <TableRow
                  key={item.id}
                  className="align-top even:bg-gray-50 hover:bg-blue-50/60 transition-colors"
                >
                  <TableCell className="text-center px-4 py-3 font-medium">
                    {item.id}
                  </TableCell>
                  <TableCell className="break-words whitespace-pre-line max-w-sm px-4 py-3">
                    {item.indicatorName}
                  </TableCell>
                  <TableCell className="text-center px-4 py-3">
                    {item.unit}
                  </TableCell>
                  <TableCell className="text-center px-4 py-3">
                    {item.weight}
                  </TableCell>
                  <TableCell className="text-center px-4 py-3">
                    {item.target}
                  </TableCell>
                  <TableCell className="whitespace-pre-line px-4 py-3">
                    {item.criteria}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Textarea
                      className="w-[350px] h-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:border-blue-400 resize-y"
                      value={item.evaluationResult || ""}
                      onChange={(e) =>
                        handleEvaluationResultChange(item.id, e.target.value)
                      }
                      placeholder="ระบุผลงานที่ทำได้จริง..."
                    />
                  </TableCell>
                  <TableCell className="text-center px-4 py-3 font-semibold text-blue-700">
                    {item.evaluationScore}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
          {data.length > 0 && (
            <Button
              type="button"
              className="mt-2 md:mt-0"
              onClick={handleEvaluate}
              disabled={isEvaluatingPerformance}
            >
              {isEvaluatingPerformance
                ? "Evaluating..."
                : "Submit Evaluate Performance"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
