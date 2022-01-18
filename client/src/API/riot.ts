import Send from "./interceptor";

enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const getSummonerMatchList = (summonerName: string) => {
  return Send({
    method: Methods.POST,
    url: "/riot/searchSummoner",
    data: { summonerName },
  });
};

const getMatchDetailInfo = (matchId: number) => {
  return Send({
    method: Methods.POST,
    url: "/riot/matchInfo",
    data: { matchId },
  });
};

export { getSummonerMatchList, getMatchDetailInfo };
