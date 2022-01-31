import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { getSummonerMatchList, getMatchDetailInfo } from "../../API/riot";
import { MatchListFilterType } from "./interface/commonFunc.interface";
import { MatchSummaryType, MatchSummaryDetailType } from "../interface/matchSummary.interface";
import { SuccessMatchList, SuccessMatchDetailInfo } from "./interface/commonFunc.interface";
import { MATCH_SUMMARY_DETAIL, FAIL, MATCH_SUMMARY, JANDI, LINE_WIN_OR_LOSE } from "../type";
import { ComparingWithEnemyType } from "../interface/comparingWithEnemy.interface";
import { Jandi } from "../interface/jandi.interface";
import { LineWinOrLoseType } from "../interface/lineWinOrLose.interface";

const summonerMatchList = (summonerName: string, type: MatchListFilterType) => {
  type T = typeof type extends typeof MATCH_SUMMARY ? MatchSummaryType[] : ComparingWithEnemyType[];
  return async (dispatch: Dispatch<SuccessMatchList<any>>) => {
    try {
      const {
        data,
      }: AxiosResponse<{
        success: boolean;
        data: {
          matchArr: T;
          jandi: Jandi[];
          line: LineWinOrLoseType[];
        };
      }> = await getSummonerMatchList(summonerName, type);

      // 게임 리스트
      dispatch({
        type,
        payload: { matchArr: data.data.matchArr, line: data.data.line },
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
  (gameId: number) => async (dispatch: Dispatch<SuccessMatchDetailInfo<MatchSummaryDetailType>>) => {
    try {
      const { data }: AxiosResponse<{ success: boolean; data: MatchSummaryDetailType }> = await getMatchDetailInfo(
        gameId
      );

      dispatch({
        type: MATCH_SUMMARY_DETAIL,
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
