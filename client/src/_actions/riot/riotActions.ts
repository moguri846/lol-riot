import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import {
  loadSummonerInfo,
  loadMatchInfo,
  loadMatchDetailInfo,
  loadSpectatorInfo,
  loadMultiSearch,
} from "../../API/riot";
import {
  GAME_INFO_FAIL,
  MATCH_DETAIL_FAIL,
  MULTI_SEARCH,
  MULTI_SEARCH_FAIL,
  REMOVE_RIOT_FAIL,
  SPECTATOR_FAIL,
  SUMMONER_FAIL,
} from "./constant/riot.constant";
import { IMatchDetailResponse, IMatchInfo, ISummoner, MatchListFilterType } from "./interface/dispatch.interface";
import { SuccessMatchList, SuccessMatchDetailInfo } from "./interface/dispatch.interface";
import {
  SUMMONER,
  COMPARING_WITH_ENEMY,
  COMPARING_WITH_ENEMY_DETAIL,
  JANDI,
  LINE_WIN_OR_LOSE,
  SPECTATOR,
} from "./constant/riot.constant";
import { IComparingWithEnemyDetail, IMatchSummaryDetailParameter } from "./interface/matchSummary.interface";
import { ISpectator } from "./interface/spectator.interface";

const summonerInfo =
  (summonerName: string, type: MatchListFilterType) => async (dispatch: Dispatch<SuccessMatchList<any>>) => {
    try {
      const {
        data: { data: summoner },
      }: AxiosResponse<ISummoner> = await loadSummonerInfo(summonerName, type);

      // 유저 정보
      dispatch({
        type: SUMMONER,
        payload: summoner,
      });

      return summoner;
    } catch (err: any) {
      const status = err.response.status;
      const errMessage = err.response.data.data || err.message;

      dispatch({
        type: SUMMONER_FAIL,
        payload: { status, errMessage },
      });

      throw errMessage;
    }
  };

const matchInfo = (puuid: string) => async (dispatch: Dispatch<any>) => {
  try {
    const {
      data: {
        data: { matchArr, jandi, lineWinOrLose },
      },
    }: AxiosResponse<IMatchInfo> = await loadMatchInfo(puuid);

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
    const status = err.status;
    const errMessage = err.response.data.data || err.message;

    dispatch({
      type: GAME_INFO_FAIL,
      payload: { status, errMessage },
    });

    throw errMessage;
  }
};

const spectatorInfo = (encryptedSummonerId: string) => async (dispatch: Dispatch<any>) => {
  try {
    const {
      data: { data: spectator },
    }: AxiosResponse<{ data: ISpectator }> = await loadSpectatorInfo(encryptedSummonerId);

    dispatch({
      type: SPECTATOR,
      payload: spectator,
    });
  } catch (err: any) {
    const status = err.response.status;
    const errMessage = err.response.data.data || err.message;

    dispatch({
      type: SPECTATOR_FAIL,
      payload: { status, errMessage },
    });

    throw errMessage;
  }
};

const multiSearchInfo = (summonerNames: string[]) => async (dispatch: Dispatch<any>) => {
  try {
    const {
      data: { data: multiSearch },
    } = await loadMultiSearch(summonerNames);

    dispatch({
      type: MULTI_SEARCH,
      payload: multiSearch,
    });
  } catch (err: any) {
    console.log("err", err);

    const status = err.response.status;
    const errMessage = err.response.data.data || err.message;

    dispatch({
      type: MULTI_SEARCH_FAIL,
      payload: { status, errMessage },
    });

    throw errMessage;
  }
};

const matchDetailInfo =
  (parameterObj: IMatchSummaryDetailParameter) =>
  async (dispatch: Dispatch<SuccessMatchDetailInfo<IComparingWithEnemyDetail[]>>) => {
    try {
      const { data }: AxiosResponse<IMatchDetailResponse> = await loadMatchDetailInfo(parameterObj);

      dispatch({
        type: COMPARING_WITH_ENEMY_DETAIL,
        payload: data.data,
      });
    } catch (err: any) {
      const status = err.response.status;
      const errMessage = err.response.data.data || err.message;

      dispatch({
        type: MATCH_DETAIL_FAIL,
        payload: { status, errMessage },
      });

      throw errMessage;
    }
  };

export { summonerInfo, matchInfo, spectatorInfo, multiSearchInfo, matchDetailInfo };
