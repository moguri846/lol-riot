import Send from "./interceptor";
import { makeQueryString } from "./common/commonFunc";
import { Methods } from "./common/methods";
import { IMatchDetailParameter } from "../toolkit/riot/gameInfoSlice/interface/matchDetail.interface";

const loadSummonerInfo = (summonerName: string) => {
  const queryStringObj = {
    summonerName,
  };

  return Send({
    method: Methods.GET,
    url: `/riot/summonerInfo?${makeQueryString(queryStringObj)}`,
  });
};

const loadMatchInfo = (puuid: string) => {
  return Send({
    method: Methods.GET,
    url: `/riot/summonerMatchList?${makeQueryString({ puuid })}`,
  });
};

const loadSpectatorInfo = (encryptedSummonerId: string) => {
  const queryStringObj = {
    encryptedSummonerId,
  };

  return Send({
    method: Methods.GET,
    url: `/riot/spectatorInfo?${makeQueryString(queryStringObj)}`,
  });
};

const loadMultiSearch = (summonerNames: string[]) => {
  const queryStringObj = {
    summonerNames,
  };
  return Send({
    method: Methods.GET,
    url: `/riot/multiSearch?${makeQueryString(queryStringObj)}`,
  });
};

const loadMatchDetailInfo = ({ gameId, player, enemy }: IMatchDetailParameter) => {
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

export { loadSummonerInfo, loadMatchDetailInfo, loadSpectatorInfo, loadMultiSearch, loadMatchInfo };
