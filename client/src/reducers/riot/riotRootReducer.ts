import { combineReducers } from "redux";

import summoner from "./summonerReducer";
import matchSummary from "./matchSummaryReducer";
import jandi from "./jandiReducer";
import lineWinOrLose from "./lineWinOrLoseReducer";

const riotRootReducer = combineReducers({
  summoner,
  matchSummary,
  jandi,
  lineWinOrLose,
});

export type RiotRootReducerType = ReturnType<typeof riotRootReducer>;

export default riotRootReducer;
