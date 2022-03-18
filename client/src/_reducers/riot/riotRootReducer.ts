import { combineReducers } from "redux";

import summoner from "./summonerReducer";
import spectator from "./spectatorReducer";
import matchSummary from "./matchSummaryReducer";
import jandi from "./jandiReducer";
import lineWinOrLose from "./lineWinOrLoseReducer";

const riotRootReducer = combineReducers({
  summoner,
  spectator,
  matchSummary,
  jandi,
  lineWinOrLose,
});

export type RiotRootReducerType = ReturnType<typeof riotRootReducer>;

export default riotRootReducer;
