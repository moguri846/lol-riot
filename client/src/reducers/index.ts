import { combineReducers } from "redux";

import matchSummaryReducer from "./matchSummaryReducer";
import jandiReducer from "./jandiReducer";

const rootReducer = combineReducers({
  matchSummaryReducer,
  jandiReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
