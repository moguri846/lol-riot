import { ISummoner, ISummonerSuccess } from "../../summonerInfoSlice/interface/summonerInfoSlice.interface";

export interface IMultiSearch {
  summonerInfo: ISummonerSuccess;
  mostLine: string;
  matchArr: IMultiSearchMatchArr[];
}

export interface IMultiSearchMatchArr {
  assists: number;
  championName: string;
  deaths: number;
  gameCreation: number;
  gameEndTimestamp: number;
  individualPosition: string;
  kills: number;
  win: boolean;
}

export interface IMultiSearchSuccess {
  success: true;
  data: IMultiSearch[];
}
export interface IMultiSearchFailed {
  success: false;
  status: number;
  data: string;
}

export type MultiSearchType = IMultiSearchSuccess | IMultiSearchFailed;
