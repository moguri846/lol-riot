import { combineReducers } from "redux";
import spectator from "./spectatorSlice/spectatorSlice";
import gameInfo from "./gameInfoSlice/gameInfoSlice";

const riotRootReducer = combineReducers({
  spectator,
  gameInfo,
});

export default riotRootReducer;
