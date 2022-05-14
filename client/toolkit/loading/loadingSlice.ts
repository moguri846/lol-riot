import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootReducerType } from "../store";
import { LOADING } from "./constant/loadingSlice.constant";
import { ILoading, ILoadingParameter, LoadingStatusType } from "./interface/loadingSlice.interface";

const initialLoadingSliceState: ILoading = {
  loading: {
    spectator: false,
    gameInfo: false,
  },
};

const loadingSlice = createSlice({
  name: LOADING,
  initialState: initialLoadingSliceState,
  reducers: {
    loadingAction(state, { type, payload }: PayloadAction<ILoadingParameter, LoadingStatusType>) {
      state.loading = { ...state.loading, ...payload };
    },
  },
});

const { loadingAction } = loadingSlice.actions;

const selectLoading = (state: RootReducerType) => state.loading.loading;

export { selectLoading, loadingAction };

export default loadingSlice.reducer;
