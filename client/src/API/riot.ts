import Send from "./interceptor";

enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const getSummonerMatchList = (summonerName: string) => {
  return Send({
    method: Methods.GET,
    url: `/riot/searchSummoner?summonerName=${summonerName}`,
  });
};

const getMatchDetailInfo = (matchId: number) => {
  return Send({
    method: Methods.GET,
    url: `/riot/matchInfo?gameId=${matchId}`,
  });
};

export { getSummonerMatchList, getMatchDetailInfo };
