import {
  OAUTH_LOGIN,
  REISSUE_TOKEN,
  VALID_TOKEN,
  EXPIRED_TOKEN,
  NON_EXISTENT_TOKEN,
  OAUTH_LOGOUT,
} from "../../_actions/user/constant/user.constant";
import {
  IInitialState,
  ISuccessOAuthLogin,
  ISuccessOAuthLogout,
  IReissueOAuthPayload,
} from "../../_actions/user/interface/dispatch.interface";

const inititalState: IInitialState = {
  isLogin: false,
  message: "존재하지 않은 토큰",
};

type ActionType =
  | { type: typeof OAUTH_LOGIN; payload: ISuccessOAuthLogin }
  | { type: typeof REISSUE_TOKEN; payload: IReissueOAuthPayload }
  | { type: typeof VALID_TOKEN; payload: IReissueOAuthPayload }
  | { type: typeof EXPIRED_TOKEN; payload: IReissueOAuthPayload }
  | { type: typeof NON_EXISTENT_TOKEN; payload: IReissueOAuthPayload }
  | { type: typeof OAUTH_LOGOUT; payload: ISuccessOAuthLogout };

const reducer = (state = inititalState, action: ActionType) => {
  switch (action.type) {
    case OAUTH_LOGIN: {
      return { ...state, ...action.payload };
    }
    case REISSUE_TOKEN: {
      return { ...state, ...action.payload };
    }
    case VALID_TOKEN: {
      return { ...state, ...action.payload };
    }
    case EXPIRED_TOKEN: {
      return { ...state, ...action.payload };
    }
    case NON_EXISTENT_TOKEN: {
      return { ...state, ...action.payload };
    }
    case OAUTH_LOGOUT: {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer;
