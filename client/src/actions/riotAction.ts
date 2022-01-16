import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { getSummonerMatchList } from "../API/riot";
import { MatchDispatchType, MatchType } from "./interface/riotAction.interface";
import { SUCCESS_MATCH, FAIL } from "./type";

const summonerMatchList = (summonerName: string) => async (dispatch: Dispatch<MatchDispatchType>) => {
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

export { summonerMatchList };
