import { combineReducers } from "redux";

const userRootReducer = combineReducers({
  //   user,
});

export type UserRootReducerType = ReturnType<typeof userRootReducer>;

export default userRootReducer;
