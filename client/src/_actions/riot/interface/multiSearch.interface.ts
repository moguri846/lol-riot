import { ILineWinLose } from "./lineWinOrLose.interface";
import { SummonerType } from "./summoner.interface";

export interface IMultiSearch {
  summonerInfo: SummonerType;
  lineWinOrLose: {
    TOP: ILineWinLose;
    JUNGLE: ILineWinLose;
    MIDDLE: ILineWinLose;
    BOTTOM: ILineWinLose;
    UTILITY: ILineWinLose;
  };
  matchArr: {
    gameCreation: number;
    championName: string;
    kills: number;
    assists: number;
    deaths: number;
    win: boolean;
  }[];
}
