import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { checkToken, reissueToken } from "../../../../API/auth";
import { useAppDispatch } from "../../../../hooks/useRedux";
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

const tokenReissue = async (type: "searchMyName" | "kakao"): Promise<{ success: boolean; token?: IToken }> => {
  try {
    const {
      data: { data },
    } = await reissueToken(type);
    return { success: true, token: data };
  } catch (err) {
    return { success: false };
  }
};

const tokenCheckAction = async (
  auth_type: "searchMyName" | "kakao"
): Promise<{ success: boolean; status?: number }> => {
  try {
    const {
      data: { success },
    } = await checkToken(auth_type);
    return { success };
  } catch (err) {
    return {
      success: false,
      status: err.response.status,
    };
  }
};

const tokenStatusAction = createAsyncThunk(
  `${USER}/${TOKEN_CHECK}`,
  async (auth_type: "searchMyName" | "kakao", { rejectWithValue }) => {
    const tokenStatus: ITokenStatus = {
      type: NON_EXISTENT_TOKEN,
      isLogin: false,
      message: "존재하지 않은 토큰",
    };

    const { success, status } = await tokenCheckAction(auth_type);

    if (success) {
      tokenStatus.type = VALID_TOKEN;
      tokenStatus.isLogin = true;
      tokenStatus.message = "유효한 토큰";
    } else {
      if (status === 401) {
        const { success, token } = await tokenReissue(auth_type);

        if (success) {
          saveToken(token);
          tokenStatus.type = VALID_TOKEN;
          tokenStatus.isLogin = true;
          tokenStatus.message = "유효한 토큰";
        } else {
          localStorage.clear();
        }
      }
    }

    return tokenStatus;
  }
);

const saveToken = (token: IToken) => {
  localStorage.setItem(ACCESS_TOKEN, token.access_token);
  if (token.refresh_token) {
    localStorage.setItem(REFRESH_TOKEN, token.refresh_token);
  }
};

export { tokenStatusAction, saveToken };
