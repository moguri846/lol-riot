import { IGameInfoSuccess } from "../../toolkit/riot/gameInfoSlice/interface/gameInfo.interface";
import { IComparingWithEnemyDetail } from "../../toolkit/riot/gameInfoSlice/interface/matchDetail.interface";
import { IMultiSearchSuccess } from "../../toolkit/riot/multiSearchSlice/interface/multiSearchSlice.interface";
import { ISpectatorSuccess } from "../../toolkit/riot/spectatorSlice/interface/spectatorSlice.interface";
import { ISummonerSuccess } from "../../toolkit/riot/summonerInfoSlice/interface/summonerInfoSlice.interface";
import { ICommon } from "../common/common.interface";

export interface ISummonerInfo extends ICommon {
  data: ISummonerSuccess;
}

export interface IMatchInfo extends ICommon {
  data: IGameInfoSuccess;
}

export interface ISpectatorInfo extends ICommon {
  data: ISpectatorSuccess;
}

export interface IMultiSearchInfo extends ICommon {
  data: IMultiSearchSuccess;
}

export interface IMatchDetailInfo extends ICommon {
  data: IComparingWithEnemyDetail;
}
