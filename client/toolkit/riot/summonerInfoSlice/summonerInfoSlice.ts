import { createSlice, PayloadAction, PrepareAction } from "@reduxjs/toolkit";
import { RootReducerType } from "../../store";
import { SUMMONER_INFO } from "../constant/riot.constant";
import { IInitialStateType } from "../common/interface/common.interface";
import { summonerInfoAction } from "./func/summonerSlice.func";
import { ISummoner } from "./interface/summonerInfoSlice.interface";

export const initialSummonerInfoSliceState: IInitialStateType<ISummoner> = {
  accountId: "",
  id: "",
  leaguePoints: 0,
  losses: 0,
  name: "",
  profileIconId: 0,
  puuid: "",
  queueType: "",
  rank: "",
  revisionDate: 0,
  summonerLevel: 0,
  tier: "",
  wins: 0,
};

const summonerInfoSlice = createSlice({
  name: SUMMONER_INFO,
  initialState: initialSummonerInfoSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(summonerInfoAction.pending, (state, { type, payload }) => {});
    builder.addCase(summonerInfoAction.fulfilled, (state, { type, payload }: PayloadAction<ISummoner, string>) => {
      return { ...payload };
    });
    builder.addCase(summonerInfoAction.rejected, (state, { type, payload }: PayloadAction<any, string>) => {
      return { ...payload };
    });
  },
});

const selectSummonerInfo = (state: RootReducerType) => state.riot.summonerInfo;

export { selectSummonerInfo };

export default summonerInfoSlice.reducer;
