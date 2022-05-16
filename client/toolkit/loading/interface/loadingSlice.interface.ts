import { LOADING, FULFILLED } from "../constant/loadingSlice.constant";

export interface ILoadingParameter {
  summonerInfo?: boolean;
  spectator?: boolean;
  gameInfo?: boolean;
}

export interface ILoading {
  loading: {
    summonerInfo?: boolean;
    spectator?: boolean;
    gameInfo?: boolean;
  };
}

export type LoadingStatusType = typeof LOADING | typeof FULFILLED;
