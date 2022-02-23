import Send from "./interceptor";
import { MatchListFilterType } from "../_actions/riot/interface/dispatch.interface";
import { makeQueryString } from "./common/commonFunc";
import { IMatchSummaryDetailParameter } from "../_actions/riot/interface/matchSummary.interface";
import { Methods } from "./common/methods";

const getSummonerMatchList = (summonerName: string, type: MatchListFilterType) => {
  const queryStringObj = {
    summonerName,
    type,
  };
  return Send({
    method: Methods.GET,
    url: `/riot/summonerInfo?${makeQueryString(queryStringObj)}`,
  });
};

const getMatchDetailInfo = ({ gameId, player, enemy }: IMatchSummaryDetailParameter) => {
  const queryStringObj = {
    gameId,
    player,
    enemy,
  };
  return Send({
    method: Methods.GET,
    url: `/riot/matchInfo?${makeQueryString(queryStringObj)}`,
  });
};

const loadSummonerMatchInfo = (puuid: string) => {
  return Send({
    method: Methods.GET,
    url: `/riot/summonerMatchList?${makeQueryString({ puuid })}`,
  });
};

export { getSummonerMatchList, getMatchDetailInfo, loadSummonerMatchInfo };
