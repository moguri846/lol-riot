export interface ISummoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
  queueType: string;
  tier: string;
  rank: string;
  wins: number;
  losses: number;
  leaguePoints: number;
}

export interface ISummonerSuccess extends ISummoner {
  success: true;
}
export interface ISummonerFailed {
  success: false;
  status: number;
  data: string;
}

export type SummonerType = ISummonerSuccess | ISummonerFailed;
