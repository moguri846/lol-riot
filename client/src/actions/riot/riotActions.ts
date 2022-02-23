import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { getSummonerMatchList, getMatchDetailInfo, loadSummonerMatchInfo } from "../../API/riot";
import { FAIL } from "../common/constant/common.constant";
import { IMatchDetailResponse, IMatchInfo, ISummoner, MatchListFilterType } from "./interface/dispatch.interface";
import { SuccessMatchList, SuccessMatchDetailInfo } from "./interface/dispatch.interface";
import {
  SUMMONER,
  COMPARING_WITH_ENEMY,
  COMPARING_WITH_ENEMY_DETAIL,
  JANDI,
  LINE_WIN_OR_LOSE,
} from "./constant/riot.constant";
import { IComparingWithEnemyDetail, IMatchSummaryDetailParameter } from "./interface/matchSummary.interface";

const summonerMatchList = (summonerName: string, type: MatchListFilterType) => {
  return async (dispatch: Dispatch<SuccessMatchList<any>>) => {
    try {
      const {
        data: { data: summoner },
      }: AxiosResponse<ISummoner> = await getSummonerMatchList(summonerName, type);

      const {
        data: {
          data: { matchArr, jandi, lineWinOrLose },
        },
      }: AxiosResponse<IMatchInfo> = await loadSummonerMatchInfo(summoner.puuid);

      // 유저 정보
      dispatch({
        type: SUMMONER,
        payload: summoner,
      });

      // 게임 리스트
      dispatch({
        type: COMPARING_WITH_ENEMY,
        payload: matchArr,
      });

      // 잔디
      dispatch({
        type: JANDI,
        payload: jandi,
      });

      // 라인 별 승패
      dispatch({
        type: LINE_WIN_OR_LOSE,
        payload: lineWinOrLose,
      });
    } catch (err: any) {
      const errMessage = err?.response?.data?.errMessage || err.message;
      dispatch({
        type: FAIL,
        payload: { errMessage },
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
      const errMessage = err?.response?.data?.errMessage || err.message;
      dispatch({
        type: FAIL,
        payload: { errMessage },
      });
    }
  };

export { summonerMatchList, matchDetailInfo };
