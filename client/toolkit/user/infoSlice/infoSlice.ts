import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootReducerType } from "../../store";
import { INFO } from "../constant/user.constant";
import { myInfoAction } from "./func/infoSlice.func";
import { IInfo } from "./interface/infoSlice.interface";

export const initialInfoSliceState: IInfo = {
  email: "",
};

const infoSlice = createSlice({
  name: INFO,
  initialState: initialInfoSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(myInfoAction.pending, (state, { type, payload }) => {});
    builder.addCase(myInfoAction.fulfilled, (state, { type, payload }: PayloadAction<IInfo, string>) => {
      return { ...payload };
    });
    builder.addCase(myInfoAction.rejected, (state, { type, payload }) => {});
  },
});

const selectInfo = (state: RootReducerType) => state.user.info;

export { selectInfo, myInfoAction };

export default infoSlice.reducer;
