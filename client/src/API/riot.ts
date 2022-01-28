import Send from "./interceptor";
import { SUCCESS_MATCH_SUMMARY, SUCCESS_MATCH_SUMMARY_DETAIL } from "../actions/type";

enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const getSummonerMatchList = (
  summonerName: string,
  type: typeof SUCCESS_MATCH_SUMMARY | typeof SUCCESS_MATCH_SUMMARY_DETAIL
) => {
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
