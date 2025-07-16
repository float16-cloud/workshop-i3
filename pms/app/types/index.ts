export type EvalulateForm = {
  id: string;
  indicatorName: string;
  unit: string;
  weight: number;
  target: string | number;
  criteria: string;
  evaluationResult?: string;
  evaluationScore?: number;
}