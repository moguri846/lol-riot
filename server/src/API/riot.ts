import Send from "./interceptor";

const getSummonerInfo = (summoner: string) => {
  return Send({
    method: "GET",
    url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summoner)}`,
  });
};

const getMatchIds = (puuid: string) => {
  return Send({
    method: "GET",
    url: `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1`,
  });
};

const getMatchInfo = (matchId: string) => {
  return Send({
    method: "GET",
    url: `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`,
  });
};

export { getSummonerInfo, getMatchIds, getMatchInfo };
