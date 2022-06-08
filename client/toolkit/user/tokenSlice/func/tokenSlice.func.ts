import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { checkToken, reissueToken } from "../../../../API/auth";
import { TOKEN_CHECK, USER } from "../../constant/user.constant";
import {
  ACCESS_TOKEN,
  AUTH_TYPE,
  FAIL,
  NON_EXISTENT_TOKEN,
  REFRESH_TOKEN,
  REISSUE_TOKEN,
  VALID_TOKEN,
} from "../constant/tokenSlice.constant";
import { IToken, ITokenStatus } from "../interface/tokenSlice.interface";

const checkTokenAction = createAsyncThunk(`${USER}/${TOKEN_CHECK}`, async (arg: "", { rejectWithValue }) => {
  const tokenStatus: ITokenStatus = {
    type: NON_EXISTENT_TOKEN,
    isLogin: false,
    message: "존재하지 않은 토큰",
  };
  try {
    const {
      data: { success },
    } = await checkToken();

    if (success) {
      tokenStatus.type = VALID_TOKEN;
      tokenStatus.isLogin = true;
      tokenStatus.message = "유효한 토큰";
    }

    return tokenStatus;
  } catch (err) {
    return tokenStatus;
  }
});

const saveToken = (token: IToken) => {
  localStorage.setItem(ACCESS_TOKEN, token.access_token);
  if (token.refresh_token) {
    localStorage.setItem(REFRESH_TOKEN, token.refresh_token);
  }
};

export { checkTokenAction, saveToken };
