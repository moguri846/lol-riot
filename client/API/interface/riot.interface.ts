import { IGameInfo } from "../../toolkit/riot/gameInfoSlice/interface/gameInfo.interface";
import { IComparingWithEnemyDetail } from "../../toolkit/riot/gameInfoSlice/interface/matchDetail.interface";
import { IMultiSearch } from "../../toolkit/riot/multiSearchSlice/interface/multiSearchSlice.interface";
import { ISpectator } from "../../toolkit/riot/spectatorSlice/interface/spectatorSlice.interface";
import { ISummoner } from "../../toolkit/riot/summonerInfoSlice/interface/summonerInfoSlice.interface";
import { ICommon } from "../common/common.interface";

export interface ISummonerInfo extends ICommon {
  data: ISummoner;
}

export interface IMatchInfo extends ICommon {
  data: IGameInfo;
}

export interface ISpectatorInfo extends ICommon {
  data: ISpectator;
}

export interface IMultiSearchInfo extends ICommon {
  data: IMultiSearch[];
}

export interface IMatchDetailInfo extends ICommon {
  data: IComparingWithEnemyDetail;
}
