import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { getMatchDetailInfo, getSummonerMatchList } from "../../API/riot";
import {
  MatchDetailType,
  MatchDispatchType,
  MatchFilterType,
  MatchSummaryType,
} from "../interface/matchSummaryAction.interface";
import { FAIL, MATCH_SUMMARY_DETAIL } from "../type";

const summonerMatchList =
  async (summonerName: string, type: MatchFilterType) =>
  async (dispatch: Dispatch<MatchDispatchType<MatchSummaryType[]>>) => {
    try {
      const { data }: AxiosResponse<{ success: boolean; data: MatchSummaryType[] }> = await getSummonerMatchList(
        summonerName,
        type
      );

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
      payload: { ...err.response.data },
    });
  }
};

export { summonerMatchList, matchDetailInfo };
