import { SummonerType } from "../actions/interface/summoner.interface";
import { SUMMONER } from "../actions/type";

const inititalState: SummonerType = {
  accountId: "",
  id: "",
  name: "",
  profileIconId: 0,
  puuid: "",
  revisionDate: 0,
  summonerLevel: 0,
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
