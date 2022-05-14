import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootReducerType } from "../../store";
import { TOKEN } from "../constant/user.constant";
import { ITokenStatus } from "./interface/tokenSlice.interface";

const initialTokenSliceState: ITokenStatus = {
  isLogin: false,
  message: "존재하지 않은 토큰",
};

const tokenSlice = createSlice({
  name: TOKEN,
  initialState: initialTokenSliceState,
  reducers: {
    tokenStatusUpdate(state, { type, payload }: PayloadAction<ITokenStatus, string>) {
      return { ...payload };
    },
  },
});

const { tokenStatusUpdate } = tokenSlice.actions;

const selectToken = (state: RootReducerType) => state.user.token;

export { selectToken, tokenStatusUpdate };

export default tokenSlice.reducer;
