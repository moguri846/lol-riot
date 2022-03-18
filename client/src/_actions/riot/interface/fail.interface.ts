import {
  GAME_INFO_FAIL,
  MATCH_DETAIL_FAIL,
  REMOVE_RIOT_FAIL,
  SPECTATOR_FAIL,
  SUMMONER_FAIL,
} from "../constant/riot.constant";
import { IFailInitial } from "../../common/interface/common.interface";

export type RiotFailType =
  | typeof SUMMONER_FAIL
  | typeof SPECTATOR_FAIL
  | typeof GAME_INFO_FAIL
  | typeof MATCH_DETAIL_FAIL
  | typeof REMOVE_RIOT_FAIL;

export interface IRiotFail {
  summoner: IFailInitial;
  spectator: IFailInitial;
  gameInfo: IFailInitial;
  matchDetail: IFailInitial;
}
