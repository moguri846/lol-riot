import { combineReducers } from "redux";
import riot from "./riot/riotRootReducer";
import user from "./user/userRootReducer";

const rootReducer = combineReducers({
  riot,
  user,
});

export type RootReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
