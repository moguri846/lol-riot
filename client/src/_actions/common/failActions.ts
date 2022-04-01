import { Dispatch } from "redux";
import { REMOVE_RIOT_FAIL } from "../riot/constant/riot.constant";

const removeFailAction = () => (dispatch: Dispatch<any>) => {
  dispatch({
    type: REMOVE_RIOT_FAIL,
    payload: {},
  });
};

export { removeFailAction };
