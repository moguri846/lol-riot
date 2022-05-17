export interface ISpectator {
  gmaeId: number;
  gameMode: string;
  gameStartTime: number;
  players: {
    bot: boolean;
    championId: number;
    championName: string;
    gameCustomizationObjects: {
      category?: string;
      content?: string;
    }[];
    perks: {
      perkIds: number[];
      perkStyle: number;
      perkSubStyle: number;
    };
    profileIconId: number;
    spells: [string, string];
    summonerId: string;
    summonerName: string;
    teamId: number;
  }[];
  bannedChampions: {
    championId: number;
    championName: string;
    pickTurn: number;
    teamId: number;
  }[];
}

export interface ISpectatorSuccess extends ISpectator {
  success: true;
}
export interface ISpectatorFailed extends ISpectator {
  success: false;
  status: number;
  data: string;
}

export type SpectatorType = ISpectatorSuccess | ISpectatorFailed;
