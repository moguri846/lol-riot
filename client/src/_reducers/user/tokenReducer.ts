import { OAUTH_LOGIN, OAUTH_LOGOUT } from "../../_actions/user/constant/user.constant";
import { IToken } from "../../_actions/user/interface/dispatch.interface";

const inititalState: IToken = {
  access_token: "",
  expires_in: "",
  refresh_token: "",
  token_type: "",
  refresh_token_expires_in: 0,
};

type ActionType = { type: typeof OAUTH_LOGIN; payload: IToken } | { type: typeof OAUTH_LOGOUT; payload: {} };

const reducer = (state = inititalState, action: ActionType) => {
  switch (action.type) {
    case OAUTH_LOGIN: {
      return { ...state, ...action.payload };
    }
    case OAUTH_LOGOUT: {
      return { ...inititalState };
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer;
