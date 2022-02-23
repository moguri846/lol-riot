import { SummonerType } from "../../_actions/riot/interface/summoner.interface";
import { SUMMONER } from "../../_actions/riot/constant/riot.constant";

const inititalState: SummonerType = {
  accountId: "",
  id: "",
  name: "",
  profileIconId: 0,
  puuid: "",
  revisionDate: 0,
  summonerLevel: 0,
  eagueId: "",
  queueType: "",
  tier: "",
  rank: "",
  summonerId: "",
  summonerName: "",
  leaguePoints: 0,
  wins: 0,
  losses: 0,
  veteran: false,
  inactive: false,
  freshBlood: false,
  hotStreak: false,
};

type ActionType = { type: typeof SUMMONER; payload: SummonerType };

const reducer = (state = inititalState, action: ActionType) => {
  switch (action.type) {
    case SUMMONER: {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer;
