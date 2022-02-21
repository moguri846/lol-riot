import { Response } from "express";

export interface ResFuncType {
  res: Response;
  err?: any;
  data?: object;
}
