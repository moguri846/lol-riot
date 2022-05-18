import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootReducerType } from "../store";
import { LOADING } from "./constant/loadingSlice.constant";
import { ILoading, LoadingStatusType } from "./interface/loadingSlice.interface";

const initialLoadingSliceState: ILoading = {
  summonerInfo: true,
  spectator: true,
  gameInfo: true,
};

const loadingSlice = createSlice({
  name: LOADING,
  initialState: initialLoadingSliceState,
  reducers: {
    loadingAction(state, { type, payload }: PayloadAction<ILoading, LoadingStatusType>) {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

const { loadingAction } = loadingSlice.actions;

const selectLoading = (state: RootReducerType) => state.loading;

export { selectLoading, loadingAction };

export default loadingSlice.reducer;
