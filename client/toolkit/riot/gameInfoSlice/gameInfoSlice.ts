import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootReducerType } from "../../store";
import { GAME_INFO } from "../constant/riot.constant";
import { gameInfoAction, matchDetailAction } from "./func/gameInfoSlice.func";
import { IGameInfo } from "./interface/gameInfo.interface";
import { IComparingWithEnemyDetail } from "./interface/matchDetail.interface";

const initialGameInfoSliceState: IGameInfo = {
  jandi: [],
  lineWinOrLose: [],
  matchArr: [],
};

const gameInfoSlice = createSlice({
  name: GAME_INFO,
  initialState: initialGameInfoSliceState,
  reducers: {},
  extraReducers: (builder) => {
    // gameInfoAction
    builder.addCase(gameInfoAction.pending, (state, { type, payload }) => {});
    builder.addCase(gameInfoAction.fulfilled, (state, { type, payload }: PayloadAction<IGameInfo, string>) => {
      return { ...payload };
    });
    builder.addCase(gameInfoAction.rejected, (state, { type, payload }) => {});

    // matchDetailAction
    builder.addCase(matchDetailAction.pending, (state, { type, payload }) => {});
    builder.addCase(
      matchDetailAction.fulfilled,
      (state, { type, payload }: PayloadAction<IComparingWithEnemyDetail, string>) => {
        state.matchArr.filter((m) => {
          if (m.gameId === payload.gameId) {
            return (m.detail = payload);
          }
        });
      }
    );
    builder.addCase(matchDetailAction.rejected, (state, { type, payload }) => {});
  },
});

const selectGameInfo = (state: RootReducerType) => state.riot.gameInfo;

export { selectGameInfo };

export default gameInfoSlice.reducer;
