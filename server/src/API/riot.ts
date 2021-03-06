import Send from "./interceptor";

enum REGION {
  KR = "kr",
  ASIA = "asia",
}

const commonUrl = (region: string) => {
  return `https://${region}.api.riotgames.com/lol`;
};

const getSummonerInfo = (summoner: string) => {
  return Send({
    method: "GET",
    url: `${commonUrl(REGION.KR)}/summoner/v4/summoners/by-name/${encodeURIComponent(summoner)}`,
  });
};

const getSummonerDetailInfo = (encryptedSummonerId: string) => {
  return Send({
    method: "GET",
    url: `${commonUrl(REGION.KR)}/league/v4/entries/by-summoner/${encryptedSummonerId}`,
  });
};

const getMatchIds = (puuid: string) => {
  return Send({
    method: "GET",
    url: `${commonUrl(REGION.ASIA)}/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=2`,
  });
};

const loadSpectatorInfo = (encryptedSummonerId: string) => {
  return Send({
    method: "GET",
    url: `${commonUrl(REGION.KR)}/spectator/v4/active-games/by-summoner/${encryptedSummonerId}`,
  });
};

const getMatchInfo = (matchId: string) => {
  return Send({
    method: "GET",
    url: `${commonUrl(REGION.ASIA)}/match/v5/matches/${matchId}`,
  });
};

const getMatchTimeLine = (matchId: string) => {
  return Send({
    method: "GET",
    url: `${commonUrl(REGION.ASIA)}/match/v5/matches/${matchId}/timeline`,
  });
};

export { getSummonerInfo, getSummonerDetailInfo, getMatchIds, loadSpectatorInfo, getMatchInfo, getMatchTimeLine };
