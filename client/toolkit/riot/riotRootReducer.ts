import { combineReducers } from "redux";
import summonerInfo from "./summonerInfoSlice/summonerInfoSlice";
import gameInfo from "./gameInfoSlice/gameInfoSlice";

const riotRootReducer = combineReducers({
  summonerInfo,
  gameInfo,
});

export default riotRootReducer;
