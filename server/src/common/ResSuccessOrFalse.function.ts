import { ResFuncType } from "./interface/ResSuccessOrFail.interface";

export const resFunc = ({ res, err, data }: ResFuncType) => {
  let status = 200;
  let success = true;

  if (err) {
    const response = err?.response;
    status = response?.status || 500;
    success = false;
    const errMessage = response?.statusText || err?.message || "서버 에러";

    return res.status(status || 500).json({ success, data: errMessage });
  }

  return res.status(status).json({ success, data });
};
