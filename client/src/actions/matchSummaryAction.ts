import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { getSummonerMatchList, getMatchDetailInfo } from "../API/riot";
import {
  MatchDispatchType,
  MatchType,
  MatchDetailType,
  MatchFilterType,
} from "./interface/matchSummaryAction.interface";
import { MATCH_SUMMARY, FAIL, MATCH_SUMMARY_DETAIL } from "./type";

const summonerMatchList =
  (summonerName: string, type: MatchFilterType) => async (dispatch: Dispatch<MatchDispatchType<MatchType>>) => {
    try {
      const { data }: AxiosResponse<{ success: boolean; data: MatchType }> = await getSummonerMatchList(
        summonerName,
        type
      );

      dispatch({
        type: MATCH_SUMMARY,
        payload: data.data,
      });
    } catch (err: any) {
      dispatch({
        type: FAIL,
        payload: {},
      });
    }
  };

const matchDetailInfo = (gameId: number) => async (dispatch: Dispatch<MatchDispatchType<MatchDetailType>>) => {
  try {
    const { data }: AxiosResponse<{ success: boolean; data: MatchDetailType }> = await getMatchDetailInfo(gameId);

    dispatch({
      type: MATCH_SUMMARY_DETAIL,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: FAIL,
      payload: {},
    });
  }
};

export { summonerMatchList, matchDetailInfo };
