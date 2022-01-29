import { combineReducers } from "redux";

import matchSummaryReducer from "./matchSummaryReducer";

const rootReducer = combineReducers({
  matchSummaryReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
