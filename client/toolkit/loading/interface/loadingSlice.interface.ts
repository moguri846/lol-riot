import { LOADING, FULFILLED } from "../constant/loadingSlice.constant";

export interface ILoadingParameter {
  spectator?: boolean;
  gameInfo?: boolean;
}

export interface ILoading {
  loading: {
    spectator?: boolean;
    gameInfo?: boolean;
  };
}

export type LoadingStatusType = typeof LOADING | typeof FULFILLED;
