import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { getSummonerMatchList, getMatchDetailInfo } from "../../API/riot";
import { MatchSummaryType, MatchListFilterType, MatchSummaryDetailType } from "../interface/matchSummary.interface";
import { SuccessMatchList, SuccessMatchDetail } from "./interface/commonFunc.interface";
import { MATCH_SUMMARY_DETAIL, FAIL, MATCH_SUMMARY } from "../type";
import { ComparingWithEnemyType } from "../interface/comparingWithEnemy.interface";

const summonerMatchList = (summonerName: string, type: MatchListFilterType) => {
  type T = typeof type extends typeof MATCH_SUMMARY ? MatchSummaryType[] : ComparingWithEnemyType[];
  return async (dispatch: Dispatch<SuccessMatchList<T>>) => {
    try {
      const {
        data,
      }: AxiosResponse<{
        success: boolean;
        data: T;
      }> = await getSummonerMatchList(summonerName, type);

      dispatch({
        type,
        payload: data.data,
      });
    } catch (err: any) {
      dispatch({
        type: FAIL,
        payload: { ...err.response.data },
      });
    }
  };
};

const matchDetailInfo = (gameId: number) => async (dispatch: Dispatch<SuccessMatchDetail<MatchSummaryDetailType>>) => {
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
