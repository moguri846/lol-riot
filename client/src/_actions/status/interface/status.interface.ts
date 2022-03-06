import { FULFILLED, LOADING } from "../constant/status.constant";

export interface IStatus {
  summoner?: boolean;
  match?: boolean;
}

export type StatusType = typeof LOADING | typeof FULFILLED;
