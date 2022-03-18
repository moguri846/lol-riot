import { FULFILLED, LOADING } from "../../_actions/loading/constant/loading.constant";
import { ILoading, LoadingStatusType } from "../../_actions/loading/interface/loading.interface";

const inititalState: ILoading = {
  summoner: false,
  spectator: false,
  gameInfo: false,
};

type ActionType = { type: LoadingStatusType; payload: ILoading };

const reducer = (state = inititalState, action: ActionType) => {
  switch (action.type) {
    case LOADING: {
      return { ...state, ...action.payload };
    }
    case FULFILLED: {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer;
