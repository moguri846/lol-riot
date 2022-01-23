import { Response } from "express";

export interface ResFuncType {
  res: Response;
  status?: number;
  success: boolean;
  data?: object;
  errMessage?: string;
}
