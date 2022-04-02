export interface ISpectator {
  bannedChampions: {
    championId: number;
    championName: string;
    pickTurn: number;
    teamId: number;
  }[];
  gameId: number;
  gameLength: number;
  gameMode: string;
  gameQueueConfigId: number;
  gameStartTime: number;
  gameType: string;
  mapId: number;
  observers: {
    encryptionKey: string;
  };
  participants: {
    bot: boolean;
    championId: number;
    championName: string;
    spells: [string, string];
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
    spell1Id: number;
    spell2Id: number;
    summonerId: string;
    summonerName: string;
    teamId: number;
  }[];
  platformId: string;
}
