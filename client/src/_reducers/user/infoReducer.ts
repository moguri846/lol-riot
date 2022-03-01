import { MY_INFO } from "../../_actions/user/constant/user.constant";

interface MyInfo {
  email: string;
}

const inititalState: MyInfo = {
  email: "",
};

type ActionType = { type: typeof MY_INFO; payload: MyInfo };

const reducer = (state = inititalState, action: ActionType) => {
  switch (action.type) {
    case MY_INFO: {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer;
