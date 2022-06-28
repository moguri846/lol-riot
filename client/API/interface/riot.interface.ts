import { IMultiSearch } from "../../components/Organisms/MultiSearch/interface/MultiSearch.interface";
import { ISpectator } from "../../components/Organisms/Spectator/interface/Spectator.interface";
import { IGameInfo } from "../../toolkit/riot/gameInfoSlice/interface/gameInfo.interface";
import { IComparingWithEnemyDetail } from "../../toolkit/riot/gameInfoSlice/interface/matchDetail.interface";
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
  data: IMultiSearch;
}

export interface IMatchDetailInfo extends ICommon {
  data: IComparingWithEnemyDetail;
}
