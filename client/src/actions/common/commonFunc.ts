import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { getSummonerMatchList, getMatchDetailInfo } from "../../API/riot";
import { MatchListFilterType } from "./interface/commonFunc.interface";
import { MatchSummaryType, MatchSummaryDetailType } from "../interface/matchSummary.interface";
import { SuccessMatchList, SuccessMatchDetailInfo } from "./interface/commonFunc.interface";
import { MATCH_SUMMARY_DETAIL, FAIL, MATCH_SUMMARY, JANDI } from "../type";
import { ComparingWithEnemyType } from "../interface/comparingWithEnemy.interface";
import { Jandi } from "../interface/jandi.interface";

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
        };
      }> = await getSummonerMatchList(summonerName, type);

      dispatch({
        type,
        payload: data.data.matchArr,
      });

      dispatch({
        type: JANDI,
        payload: data.data.jandi,
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
