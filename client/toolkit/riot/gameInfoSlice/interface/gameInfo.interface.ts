import { IComparingWithEnemyDetail } from "./matchDetail.interface";

export interface ComparingWithEnemyType {
  gameId: number;
  gameMode: string;
  gameCreation: number;
  gameEndTimestamp: number | null;
  gameDuration: number;
  player: IPlayer;
  enemy: Pick<IPlayer, "championName" | "kills" | "wardsPlaced" | "detectorWardsPlaced" | "wardsKilled">;
  players: Pick<IPlayer, "championName" | "summonerName">[];
  win: boolean;
  detail: IComparingWithEnemyDetail | null;
  myIndex: number;
  enemyIndex: number;
}

export interface IPlayer {
  summonerName: string;
  championName: string;
  champLevel: number;
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  items: number[];
  spells: string[];
  wardsPlaced: number;
  detectorWardsPlaced: number;
  wardsKilled: number;
}

export interface Jandi {
  date: string;
  win: number;
  lose: number;
  count: number;
}

export interface ILineWinLoseRate extends ILineWinLose {
  line?: string;
}

export interface ILineWinLose {
  win: number;
  lose: number;
}

export interface IMatchInfoResponse {
  success: boolean;
  data: IGameInfo;
}

export interface IGameInfo {
  matchArr: ComparingWithEnemyType[];
  jandi: Jandi[];
  lineWinOrLose: ILineWinLoseRate[];
}
