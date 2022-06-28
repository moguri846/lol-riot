import { ISummoner } from "../../../../toolkit/riot/summonerInfoSlice/interface/summonerInfoSlice.interface";

export interface IMultiSearch {
  summonerInfo: ISummoner;
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
