import { SummonerType } from "../../actions/riot/interface/summoner.interface";
import { SUMMONER } from "../../actions/riot/constant/riot.constant";

const inititalState: SummonerType = {
  accountId: "",
  id: "",
  name: "",
  profileIconId: 0,
  puuid: "",
  summonerLevel: 0,
  queueType: "",
  tier: "",
  rank: "",
  leaguePoints: 0,
  wins: 0,
  losses: 0,
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
