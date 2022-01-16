import { combineReducers } from "redux";

import riotReducer from "./riotReducer";

const rootReducer = combineReducers({
  riotReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
