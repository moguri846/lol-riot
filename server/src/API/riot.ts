import Send from "./interceptor";

enum RIOT_URL {
  KR = "https://kr.api.riotgames.com/lol",
  ASIA = "https://asia.api.riotgames.com/lol",
}

const getSummonerInfo = (summoner: string) => {
  return Send({
    method: "GET",
    url: `${RIOT_URL.KR}/summoner/v4/summoners/by-name/${encodeURIComponent(summoner)}`,
  });
};

const getSummonerDetailInfo = (encryptedSummonerId: string) => {
  return Send({
    method: "GET",
    url: `${RIOT_URL.KR}/league/v4/entries/by-summoner/${encryptedSummonerId}`,
  });
};

const getMatchIds = (puuid: string) => {
  return Send({
    method: "GET",
    url: `${RIOT_URL.ASIA}/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=2`,
  });
};

const getMatchInfo = (matchId: string) => {
  return Send({
    method: "GET",
    url: `${RIOT_URL.ASIA}/match/v5/matches/${matchId}`,
  });
};

const getMatchTimeLine = (matchId: string) => {
  return Send({
    method: "GET",
    url: `${RIOT_URL.ASIA}/match/v5/matches/${matchId}/timeline`,
  });
};

export { getSummonerInfo, getSummonerDetailInfo, getMatchIds, getMatchInfo, getMatchTimeLine };
