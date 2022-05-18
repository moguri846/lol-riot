import { combineReducers } from "redux";
import summonerInfo from "./summonerInfoSlice/summonerInfoSlice";
import spectator from "./spectatorSlice/spectatorSlice";
import gameInfo from "./gameInfoSlice/gameInfoSlice";
import multiSearch from "./multiSearchSlice/multiSearchSlice";

const riotRootReducer = combineReducers({
  summonerInfo,
  spectator,
  gameInfo,
  multiSearch,
});

export default riotRootReducer;
