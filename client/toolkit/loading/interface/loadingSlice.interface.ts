import {
  LOADING,
  FULFILLED,
  SUMMONER_INFO,
  SPECTATOR,
  GAME_INFO,
  MULTI_SEARCH,
} from "../constant/loadingSlice.constant";

export interface ILoading {
  summonerInfo?: boolean;
  spectator?: boolean;
  gameInfo?: boolean;
  multiSearch?: boolean;
}

export type LoadingStatusType = typeof LOADING | typeof FULFILLED;

export type LoadingTypes = typeof SUMMONER_INFO | typeof SPECTATOR | typeof GAME_INFO | typeof MULTI_SEARCH;
