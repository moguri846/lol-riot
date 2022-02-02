import { combineReducers } from "redux";

import summonerReducer from "./summonerReducer";
import summonerDetailReducer from "./summonerDetailInfoReducer";
import matchSummaryReducer from "./matchSummaryReducer";
import jandiReducer from "./jandiReducer";
import lineWinOrLoseReducer from "./lineWinOrLoseReducer";

const rootReducer = combineReducers({
  summonerReducer,
  summonerDetailReducer,
  matchSummaryReducer,
  jandiReducer,
  lineWinOrLoseReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
