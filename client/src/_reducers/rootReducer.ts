import { combineReducers } from "redux";
import loading from "./loading/loadingReducer";
import riot from "./riot/riotRootReducer";
import user from "./user/userRootReducer";

const rootReducer = combineReducers({
  loading,
  riot,
  user,
});

export type RootReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
