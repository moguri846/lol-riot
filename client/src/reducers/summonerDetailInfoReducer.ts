import { SummonerDetailInfo } from "../actions/interface/SummonerDetailInfo.interface";
import { SUMMONER_DETAIL } from "../actions/type";

const inititalState: SummonerDetailInfo[] = [
  {
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
  },
];

type ActionType = { type: typeof SUMMONER_DETAIL; payload: SummonerDetailInfo };

const reducer = (state = inititalState, action: ActionType) => {
  switch (action.type) {
    case SUMMONER_DETAIL: {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer;
