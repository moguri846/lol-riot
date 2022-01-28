import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { getSummonerMatchList, getMatchDetailInfo } from "../API/riot";
import { MatchDispatchType, MatchType, MatchDetailType, MatchFilterType } from "./interface/riotAction.interface";
import { SUCCESS_MATCH_SUMMARY, FAIL, SUCCESS_MATCH_SUMMARY_DETAIL } from "./type";

const summonerMatchList =
  (summonerName: string, type: MatchFilterType) => async (dispatch: Dispatch<MatchDispatchType<MatchType>>) => {
    try {
      const { data }: AxiosResponse<{ success: boolean; summoner: MatchType }> = await getSummonerMatchList(
        summonerName,
        type
      );

      dispatch({
        type: SUCCESS_MATCH_SUMMARY,
        payload: data.summoner,
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
    const { data }: AxiosResponse<{ success: boolean; match: MatchDetailType }> = await getMatchDetailInfo(gameId);

    dispatch({
      type: SUCCESS_MATCH_SUMMARY_DETAIL,
      payload: data.match,
    });
  } catch (err: any) {
    dispatch({
      type: FAIL,
      payload: {},
    });
  }
};

export { summonerMatchList, matchDetailInfo };
