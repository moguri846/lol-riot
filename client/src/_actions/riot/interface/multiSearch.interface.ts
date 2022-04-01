import { ILineWinLose } from "./lineWinOrLose.interface";
import { SummonerType } from "./summoner.interface";

export interface IMultiSearch {
  summonerInfo: SummonerType;
  mostLine: string;
  matchArr: {
    gameCreation: number;
    gameEndTimestamp: number;
    individualPosition: string;
    championName: string;
    kills: number;
    assists: number;
    deaths: number;
    win: boolean;
  }[];
}
