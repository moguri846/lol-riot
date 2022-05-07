import { FULFILLED, LOADING } from "../constant/loading.constant";

export type LoadingStatusType = typeof LOADING | typeof FULFILLED;

export interface ILoadingStatusParameter {
  summoner?: boolean;
  multiSearch?: boolean;
  spectator?: boolean;
  gameInfo?: boolean;
}

export interface ILoading {
  summoner: boolean;
  multiSearch: boolean;
  spectator: boolean;
  gameInfo: boolean;
}
