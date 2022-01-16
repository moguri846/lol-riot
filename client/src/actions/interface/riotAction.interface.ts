import { SUCCESS_MATCH, FAIL } from "../../actions/type";

export type MatchDispatchType = SuccessMatch | FailMath;

export interface SuccessMatch {
  type: typeof SUCCESS_MATCH;
  payload: MatchType;
}

export interface FailMath {
  type: typeof FAIL;
  payload: object;
}

export interface MatchType {
  gameCreation: number;
  gameEndTimestamp: number;
  gameId: number;
  gameMode: string;
  gameStartTimestamp: number;
  player: {
    assists: number;
    champLevel: number;
    championName: string;
    cs: number;
    deaths: number;
    items: number[];
    kills: number;
    perks: {
      statPerks: {
        defense: number;
        flex: number;
        offense: number;
      };
      styles: {
        description: string;
        selections: {
          perk: number;
          var1: number;
          var2: number;
          var3: number;
        }[];
        style: number;
      };
    };
    spells: number[];
    summonerName: string;
    win: true;
  };
  players: {
    championName: string;
    puuid: string;
    summonerName: string;
  }[];
  detail: {
    redTeamPlayers: DetailPlayerType[];
    redTeamStatus: DetailTeamStatusType;
    blueTeamPlayers: DetailPlayerType[];
    blueTeamStatus: DetailTeamStatusType;
  } | null;
}

interface DetailPlayerType {
  puuid: string;
  summonerName: string;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  champLevel: number;
  cs: number;
  items: number[];
  spells: number[];
  perks: {
    statPerks: {
      defense: number;
      flex: number;
      offense: number;
    };
    styles: {
      description: string;
      selections: {
        perk: number;
        var1: number;
        var2: number;
        var3: number;
      }[];
      style: number;
    }[];
  };
  wardsPlaced: number;
  wardsKilled: number;
  goldEarned: number;
}

interface DetailTeamStatusType {
  redTeamStatus: {
    totalGold: number;
    totalKills: number;
    bans: {
      championId: number;
      pickTurn: number;
    }[];
    objectives: {
      baron: {
        first: boolean;
        kills: number;
      };
      champion: {
        first: boolean;
        kills: number;
      };
      dragon: {
        first: boolean;
        kills: number;
      };
      inhibitor: {
        first: boolean;
        kills: number;
      };
      riftHerald: {
        first: boolean;
        kills: number;
      };
      tower: {
        first: boolean;
        kills: number;
      };
    };
    teamId: number;
    win: boolean;
  };
}