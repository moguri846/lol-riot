import { ResFuncType } from "./interface/ResSuccessOrFail.interface";

export const resFunc = ({ res, status = 200, success, data, errMessage }: ResFuncType) => {
  return res.status(status || 500).json({ success, data, errMessage });
};
