import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { getSummonerMatchList, getMatchDetailInfo } from "../../API/riot";
import { IMatchDetailResponse, IMatchListResponse, MatchListFilterType } from "./interface/commonFunc.interface";
import { SuccessMatchList, SuccessMatchDetailInfo } from "./interface/commonFunc.interface";
import { SUMMONER, COMPARING_WITH_ENEMY, COMPARING_WITH_ENEMY_DETAIL, JANDI, LINE_WIN_OR_LOSE, FAIL } from "../type";
import { IComparingWithEnemyDetail, IMatchSummaryDetailParameter } from "../interface/matchSummary.interface";

const summonerMatchList = (summonerName: string, type: MatchListFilterType) => {
  return async (dispatch: Dispatch<SuccessMatchList<any>>) => {
    try {
      const { data }: AxiosResponse<IMatchListResponse> = await getSummonerMatchList(summonerName, type);

      // 유저 정보
      dispatch({
        type: SUMMONER,
        payload: data.data.summoner,
      });

      // 게임 리스트
      dispatch({
        type: COMPARING_WITH_ENEMY,
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
  (parameterObj: IMatchSummaryDetailParameter) =>
  async (dispatch: Dispatch<SuccessMatchDetailInfo<IComparingWithEnemyDetail[]>>) => {
    try {
      const { data }: AxiosResponse<IMatchDetailResponse> = await getMatchDetailInfo(parameterObj);

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
