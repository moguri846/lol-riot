import {
  SUMMONER,
  COMPARING_WITH_ENEMY,
  COMPARING_WITH_ENEMY_DETAIL,
  JANDI,
  LINE_WIN_OR_LOSE,
} from "../constant/riot.constant";
import { Jandi } from "./jandi.interface";
import { ComparingWithEnemyType, IComparingWithEnemyDetail } from "./matchSummary.interface";
import { SummonerType } from "./summoner.interface";
import { ILineWinLoseRate } from "./lineWinOrLose.interface";
import { Fail } from "../../common/interface/common.interface";

export type MatchListFilterType = typeof COMPARING_WITH_ENEMY;
export type MatchDetailInfoFilterType = typeof COMPARING_WITH_ENEMY_DETAIL;

export type SuccessMatchList<P extends ComparingWithEnemyType[] | Jandi[]> = MatchList<P> | Fail;
export type SuccessMatchDetailInfo<P extends IComparingWithEnemyDetail[]> = MatchDetail<P> | Fail;

export interface ISummoner {
  success: boolean;
  data: SummonerType;
}

export interface IMatchInfo {
  success: boolean;
  data: {
    matchArr: ComparingWithEnemyType[];
    jandi: Jandi[];
    lineWinOrLose: ILineWinLoseRate[];
  };
}

export interface IMatchDetailResponse {
  success: boolean;
  data: IComparingWithEnemyDetail[];
}

export interface MatchList<P> {
  type: typeof SUMMONER | typeof COMPARING_WITH_ENEMY | typeof JANDI | typeof LINE_WIN_OR_LOSE;
  payload: P;
}

export interface MatchDetail<P> {
  type: typeof COMPARING_WITH_ENEMY_DETAIL;
  payload: P;
}
