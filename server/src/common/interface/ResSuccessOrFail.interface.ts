import { Response } from "express";

export interface ResFuncType {
  res: Response;
  status: number | undefined;
  success: boolean;
  data?: object;
  errMessage?: string;
}
