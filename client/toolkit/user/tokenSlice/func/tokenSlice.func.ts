import { createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import { reissueToken } from "../../../../API/auth";
import { TOKEN_CHECK, USER } from "../../constant/user.constant";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES_IN,
  AUTH_TYPE,
  FAIL,
  NON_EXISTENT_TOKEN,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES_IN,
  REISSUE_TOKEN,
  VALID_TOKEN,
} from "../constant/tokenSlice.constant";
import { IToken, ITokenStatus } from "../interface/tokenSlice.interface";

const checkToken = createAsyncThunk(`${USER}/${TOKEN_CHECK}`, async (arg: "", { rejectWithValue }) => {
  const accessExpiresIn = parseInt(localStorage.getItem(ACCESS_TOKEN_EXPIRES_IN) as string);
  const Otype = localStorage.getItem(AUTH_TYPE) as string;
  const now = moment().valueOf();
  const accessDiffTime = accessExpiresIn - now;
  let tokenStatus: ITokenStatus = {
    type: NON_EXISTENT_TOKEN,
    isLogin: false,
    message: "존재하지 않은 토큰",
  };

  if (accessDiffTime) {
    // diffTime이 10분 이하
    if (accessDiffTime <= 600000) {
      tokenStatus = await reissueTokenAction();
    } else {
      tokenStatus.type = VALID_TOKEN;
      tokenStatus.isLogin = true;
      tokenStatus.message = "유효한 토큰";
    }
  } else {
    tokenStatus.type = NON_EXISTENT_TOKEN;
    tokenStatus.message = "존재하지 않은 토큰";
  }

  return tokenStatus;
});

const reissueTokenAction = async () => {
  let tokenStatus: ITokenStatus = {
    type: REISSUE_TOKEN,
    isLogin: true,
    message: "토큰 갱신",
  };
  try {
    const {
      data: { data },
    } = await reissueToken("searchMyName");

    saveToken(data);

    return tokenStatus;
  } catch (err) {
    tokenStatus = {
      type: FAIL,
      isLogin: false,
      message: err.message,
    };
    return tokenStatus;
  }
};

const saveToken = (token: IToken) => {
  localStorage.setItem(ACCESS_TOKEN, token.access_token);
  localStorage.setItem(ACCESS_TOKEN_EXPIRES_IN, String(moment().add(token.expires_in, "second").valueOf()));
  if (token.refresh_token) {
    localStorage.setItem(REFRESH_TOKEN, token.refresh_token);
  }
  if (token.refresh_token_expires_in) {
    localStorage.setItem(
      REFRESH_TOKEN_EXPIRES_IN,
      String(moment().add(token.refresh_token_expires_in, "second").valueOf())
    );
  }
};

export { checkToken, saveToken };
