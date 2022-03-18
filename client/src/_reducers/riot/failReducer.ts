import {
  GAME_INFO_FAIL,
  MATCH_DETAIL_FAIL,
  REMOVE_RIOT_FAIL,
  SPECTATOR_FAIL,
  SUMMONER_FAIL,
} from "../../_actions/riot/constant/riot.constant";
import { IRiotFail, RiotFailType } from "../../_actions/riot/interface/fail.interface";
import { IFailInitial } from "../../_actions/common/interface/common.interface";

const initialValue = {
  status: 0,
  errMessage: "",
};

const initialState: IRiotFail = {
  summoner: initialValue,
  spectator: initialValue,
  gameInfo: initialValue,
  matchDetail: initialValue,
};

type ActionType = { type: RiotFailType; payload: IFailInitial };

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case SUMMONER_FAIL: {
      return { ...state, summoner: action.payload };
    }
    case SPECTATOR_FAIL: {
      return { ...state, spectator: action.payload };
    }
    case GAME_INFO_FAIL: {
      return { ...state, gameInfo: action.payload };
    }
    case MATCH_DETAIL_FAIL: {
      return { ...state, matchDetail: action.payload };
    }
    case REMOVE_RIOT_FAIL: {
      return { ...initialState };
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer;
