import { combineReducers } from "redux";
import token from "./tokenReducer";

const userRootReducer = combineReducers({
  token,
});

export type UserRootReducerType = ReturnType<typeof userRootReducer>;

export default userRootReducer;
