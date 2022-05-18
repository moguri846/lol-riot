import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootReducerType } from "../../store";
import { MULTI_SEARCH } from "../constant/riot.constant";
import { initialSummonerInfoSliceState } from "../summonerInfoSlice/summonerInfoSlice";
import { multiSearchAction } from "./func/multiSearchSlice.func";
import { IMultiSearchSuccess } from "./interface/multiSearchSlice.interface";

export const initialMultiSearchSliceState: IMultiSearchSuccess = {
  success: true,
  data: [
    {
      matchArr: [],
      mostLine: "",
      summonerInfo: initialSummonerInfoSliceState,
    },
  ],
};

const multiSearchSlice = createSlice({
  name: MULTI_SEARCH,
  initialState: initialMultiSearchSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(multiSearchAction.pending, (state, { type, payload }) => {});
    builder.addCase(
      multiSearchAction.fulfilled,
      (state, { type, payload }: PayloadAction<IMultiSearchSuccess, string>) => {
        return { ...payload };
      }
    );
    builder.addCase(multiSearchAction.rejected, (state, { type, payload }: PayloadAction<any, string>) => {
      return { ...payload };
    });
  },
});

const selectMultiSearch = (state: RootReducerType) => state.riot.multiSearch;

export { selectMultiSearch };

export default multiSearchSlice.reducer;
