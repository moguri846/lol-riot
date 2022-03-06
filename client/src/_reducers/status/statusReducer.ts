import { IStatus } from "../../_actions/status/interface/status.interface";
import { LOADING, FULFILLED } from "../../_actions/status/constant/status.constant";

const inititalState: IStatus = {
  summoner: false,
  match: false,
};

type ActionType = { type: typeof LOADING; payload: IStatus } | { type: typeof FULFILLED; payload: IStatus };

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
