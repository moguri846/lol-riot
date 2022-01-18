import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { getSummonerMatchList, getMatchDetailInfo } from "../API/riot";
import { MatchDispatchType, MatchType, MatchDetailType } from "./interface/riotAction.interface";
import { SUCCESS_MATCH, FAIL, SUCCESS_DETAIL } from "./type";

const summonerMatchList = (summonerName: string) => async (dispatch: Dispatch<MatchDispatchType<MatchType>>) => {
  try {
    const { data }: AxiosResponse<{ success: boolean; summoner: MatchType }> = await getSummonerMatchList(summonerName);

    dispatch({
      type: SUCCESS_MATCH,
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
      type: SUCCESS_DETAIL,
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
