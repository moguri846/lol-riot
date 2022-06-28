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
