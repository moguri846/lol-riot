import { combineReducers } from "redux";
import summonerInfo from "./summonerInfoSlice/summonerInfoSlice";
import spectator from "./spectatorSlice/spectatorSlice";
import gameInfo from "./gameInfoSlice/gameInfoSlice";

const riotRootReducer = combineReducers({
  summonerInfo,
  spectator,
  gameInfo,
});

export default riotRootReducer;
