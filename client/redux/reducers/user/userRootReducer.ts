import { combineReducers } from "redux";
import token from "./tokenReducer";
import info from "./infoReducer";

const userRootReducer = combineReducers({
  token,
  info,
});

export type UserRootReducerType = ReturnType<typeof userRootReducer>;

export default userRootReducer;
