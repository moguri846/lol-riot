import { combineReducers } from "redux";
import info from "./infoSlice/infoSlice";
import token from "./tokenSlice/tokenSlice";

const userRootReducer = combineReducers({
  info,
  token,
});

export default userRootReducer;
