import { MatchSummaryDetailType, MatchSummaryType } from "../../interface/matchSummary.interface";
import { ComparingWithEnemyType } from "../../interface/comparingWithEnemy.interface";
import {
  MATCH_SUMMARY,
  COMPARING_WITH_ENEMY,
  FAIL,
  MATCH_SUMMARY_DETAIL,
  COMPARING_WITH_ENEMY_DETAIL,
  JANDI,
  LINE_WIN_OR_LOSE,
} from "../../type";
import { Jandi } from "../../interface/jandi.interface";

export type MatchListFilterType = typeof MATCH_SUMMARY | typeof COMPARING_WITH_ENEMY;
export type MatchDetailInfoFilterType = typeof MATCH_SUMMARY_DETAIL | typeof COMPARING_WITH_ENEMY_DETAIL;

export type SuccessMatchList<P extends MatchSummaryType[] | ComparingWithEnemyType[] | Jandi[]> = MatchList<P> | Fail;
export type SuccessMatchDetailInfo<P extends MatchSummaryDetailType> = MatchDetail<P> | Fail;

export interface MatchList<P> {
  type: typeof MATCH_SUMMARY | typeof COMPARING_WITH_ENEMY | typeof JANDI | typeof LINE_WIN_OR_LOSE;
  payload: P;
}

export interface MatchDetail<P> {
  type: typeof MATCH_SUMMARY_DETAIL | typeof COMPARING_WITH_ENEMY_DETAIL;
  payload: P;
}

export interface Fail {
  type: typeof FAIL;
  payload: {
    success: boolean;
    errMessage: string;
  };
}
