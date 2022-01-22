import { ResFuncType } from "./interface/ResSuccessOrFail.interface";

export const resFunc = ({ res, status, success, data, errMessage }: ResFuncType) => {
  return res.status(status || 500).json({ success, data, errMessage });
};
