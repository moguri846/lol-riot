import { combineReducers } from "redux";

import summoner from "./summonerReducer";
import spectator from "./spectatorReducer";
import matchSummary from "./matchSummaryReducer";
import jandi from "./jandiReducer";
import lineWinOrLose from "./lineWinOrLoseReducer";
import multiSearch from "./multiSearchReducer";
import fail from "./failReducer";

const riotRootReducer = combineReducers({
  summoner,
  spectator,
  matchSummary,
  jandi,
  lineWinOrLose,
  multiSearch,
  fail,
});

export type RiotRootReducerType = ReturnType<typeof riotRootReducer>;

export default riotRootReducer;
