import { FAIL } from "../constant/common.constant";

export interface Fail {
  type: typeof FAIL;
  payload: {
    isLogin?: boolean;
    errMessage: string;
  };
}
