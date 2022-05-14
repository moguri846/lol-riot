import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootReducerType } from "../../store";
import { SPECTATOR_INFO } from "../constant/riot.constant";
import { spectatorInfo } from "./func/spectatorSlice.func";
import { ISpectator } from "./interface/spectatorSlice.interface";

export const initialSpectatorSliceState: ISpectator = {
  gmaeId: 0,
  gameMode: "",
  gameStartTime: 0,
  players: [],
  bannedChampions: [],
};

const spectatorSlice = createSlice({
  name: SPECTATOR_INFO,
  initialState: initialSpectatorSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(spectatorInfo.pending, (state, { type, payload }) => {});
    builder.addCase(spectatorInfo.fulfilled, (state, { type, payload }: PayloadAction<ISpectator, string>) => {
      return { ...payload };
    });
    builder.addCase(spectatorInfo.rejected, (state, { type, payload }) => {});
  },
});

const selectSpectator = (state: RootReducerType) => state.riot.spectator;

export { selectSpectator };

export default spectatorSlice.reducer;
