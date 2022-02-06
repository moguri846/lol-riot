import { combineReducers } from "redux";

import summoner from "./summonerReducer";
import matchSummary from "./matchSummaryReducer";
import jandi from "./jandiReducer";
import lineWinOrLose from "./lineWinOrLoseReducer";

const rootReducer = combineReducers({
  summoner,
  matchSummary,
  jandi,
  lineWinOrLose,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
