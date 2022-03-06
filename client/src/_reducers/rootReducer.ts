import { combineReducers } from "redux";
import status from "./status/statusReducer";
import riot from "./riot/riotRootReducer";
import user from "./user/userRootReducer";

const rootReducer = combineReducers({
  status,
  riot,
  user,
});

export type RootReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
