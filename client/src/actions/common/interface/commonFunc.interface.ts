import { SUMMONER, COMPARING_WITH_ENEMY, COMPARING_WITH_ENEMY_DETAIL, JANDI, LINE_WIN_OR_LOSE, FAIL } from "../../type";
import { Jandi } from "../../interface/jandi.interface";
import { ComparingWithEnemyType, IComparingWithEnemyDetail } from "../../interface/matchSummary.interface";
import { SummonerType } from "../../interface/summoner.interface";
import { LineWinOrLoseType } from "../../interface/lineWinOrLose.interface";

export type MatchListFilterType = typeof COMPARING_WITH_ENEMY;
export type MatchDetailInfoFilterType = typeof COMPARING_WITH_ENEMY_DETAIL;

export type SuccessMatchList<P extends ComparingWithEnemyType[] | Jandi[]> = MatchList<P> | Fail;
export type SuccessMatchDetailInfo<P extends IComparingWithEnemyDetail[]> = MatchDetail<P> | Fail;

export interface IMatchListResponse {
  success: boolean;
  data: {
    summoner: SummonerType;
    matchArr: ComparingWithEnemyType[];
    jandi: Jandi[];
    line: LineWinOrLoseType[];
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

export interface Fail {
  type: typeof FAIL;
  payload: {
    success: boolean;
    errMessage: string;
  };
}
