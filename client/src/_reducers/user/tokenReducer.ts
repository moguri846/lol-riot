import {
  SIGN_IN,
  REISSUE_TOKEN,
  VALID_TOKEN,
  EXPIRED_TOKEN,
  NON_EXISTENT_TOKEN,
  LOGOUT,
} from "../../_actions/user/constant/user.constant";
import {
  IInitialState,
  ISuccessAuthSignIn,
  ISuccessAuthLogout,
  IReissueAuthPayload,
} from "../../_actions/user/interface/dispatch.interface";

const inititalState: IInitialState = {
  isLogin: false,
  message: "존재하지 않은 토큰",
};

type ActionType =
  | { type: typeof SIGN_IN; payload: ISuccessAuthSignIn }
  | { type: typeof REISSUE_TOKEN; payload: IReissueAuthPayload }
  | { type: typeof VALID_TOKEN; payload: IReissueAuthPayload }
  | { type: typeof EXPIRED_TOKEN; payload: IReissueAuthPayload }
  | { type: typeof NON_EXISTENT_TOKEN; payload: IReissueAuthPayload }
  | { type: typeof LOGOUT; payload: ISuccessAuthLogout };

const reducer = (state = inititalState, action: ActionType) => {
  switch (action.type) {
    case SIGN_IN: {
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
    case LOGOUT: {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer;
