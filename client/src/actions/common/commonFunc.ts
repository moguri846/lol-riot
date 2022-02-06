import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { getSummonerMatchList, getMatchDetailInfo } from "../../API/riot";
import { MatchListFilterType } from "./interface/commonFunc.interface";
import { MatchSummaryType, MatchSummaryDetailType } from "../interface/matchSummary.interface";
import { SuccessMatchList, SuccessMatchDetailInfo } from "./interface/commonFunc.interface";
import {
  MATCH_SUMMARY_DETAIL,
  FAIL,
  MATCH_SUMMARY,
  JANDI,
  LINE_WIN_OR_LOSE,
  SUMMONER,
  COMPARING_WITH_ENEMY_DETAIL,
} from "../type";
import { ComparingWithEnemyType, IComparingWithEnemyDetail } from "../interface/comparingWithEnemy.interface";
import { Jandi } from "../interface/jandi.interface";
import { LineWinOrLoseType } from "../interface/lineWinOrLose.interface";
import { SummonerType } from "../interface/summoner.interface";

const summonerMatchList = (summonerName: string, type: MatchListFilterType) => {
  type T = typeof type extends typeof MATCH_SUMMARY ? MatchSummaryType[] : ComparingWithEnemyType[];
  return async (dispatch: Dispatch<SuccessMatchList<any>>) => {
    try {
      const {
        data,
      }: AxiosResponse<{
        success: boolean;
        data: {
          summoner: SummonerType;
          matchArr: ComparingWithEnemyType[];
          jandi: Jandi[];
          line: LineWinOrLoseType[];
        };
      }> = await getSummonerMatchList(summonerName, type);

      // 유저 정보
      dispatch({
        type: SUMMONER,
        payload: data.data.summoner,
      });

      // 게임 리스트
      dispatch({
        type,
        payload: data.data.matchArr,
      });

      // 잔디
      dispatch({
        type: JANDI,
        payload: data.data.jandi,
      });

      // 라인 별 승패
      dispatch({
        type: LINE_WIN_OR_LOSE,
        payload: data.data.line,
      });
    } catch (err: any) {
      dispatch({
        type: FAIL,
        payload: { ...err.response.data },
      });
    }
  };
};

const matchDetailInfo =
  (s: ComparingWithEnemyType) => async (dispatch: Dispatch<SuccessMatchDetailInfo<IComparingWithEnemyDetail[]>>) => {
    try {
      const { data }: AxiosResponse<{ success: boolean; data: IComparingWithEnemyDetail[] }> = await getMatchDetailInfo(
        s
      );

      dispatch({
        type: COMPARING_WITH_ENEMY_DETAIL,
        payload: data.data,
      });
    } catch (err: any) {
      dispatch({
        type: FAIL,
        payload: { ...err.response.data },
      });
    }
  };

export { summonerMatchList, matchDetailInfo };
