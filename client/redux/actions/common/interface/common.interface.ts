import { RiotFailType } from "../../riot/interface/fail.interface";
import { FAIL } from "../constant/common.constant";

export interface IFailInitial {
  status: number;
  errMessage: string;
}

export interface Fail {
  type: typeof FAIL | RiotFailType;
  payload: {
    isLogin?: boolean;
    status: number;
    errMessage: string;
  };
}
