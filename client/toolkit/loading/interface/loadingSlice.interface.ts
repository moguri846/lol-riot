import { LOADING, FULFILLED } from "../constant/loadingSlice.constant";

export interface ILoading {
  summonerInfo?: boolean;
  spectator?: boolean;
  gameInfo?: boolean;
  multiSearch?: boolean;
}

export type LoadingStatusType = typeof LOADING | typeof FULFILLED;
