import Send from "./interceptor";
import { MatchListFilterType } from "../actions/common/interface/commonFunc.interface";

enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const getSummonerMatchList = (summonerName: string, type: MatchListFilterType) => {
  return Send({
    method: Methods.GET,
    url: `/riot/searchSummoner?summonerName=${summonerName}&type=${type}`,
  });
};

const getMatchDetailInfo = (matchId: number) => {
  return Send({
    method: Methods.GET,
    url: `/riot/matchInfo?gameId=${matchId}`,
  });
};

export { getSummonerMatchList, getMatchDetailInfo };
