import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootReducerType } from "../../store";
import { TOKEN } from "../constant/user.constant";
import { checkToken } from "./func/tokenSlice.func";
import { ITokenStatus } from "./interface/tokenSlice.interface";

export const initialTokenSliceState: ITokenStatus = {
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
  extraReducers: (builder) => {
    builder.addCase(checkToken.pending, (state, { type, payload }) => {});
    builder.addCase(checkToken.fulfilled, (state, { type, payload }) => {
      return {
        ...payload,
      };
    });
  },
});

const { tokenStatusUpdate } = tokenSlice.actions;

const selectToken = (state: RootReducerType) => state.user.token;

export { selectToken, tokenStatusUpdate };

export default tokenSlice.reducer;
