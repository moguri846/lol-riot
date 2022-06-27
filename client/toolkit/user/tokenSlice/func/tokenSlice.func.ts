import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkToken, reissueToken } from "../../../../API/auth";
import { AuthTypes, IReissueToken } from "../../../../API/interface/auth.interface";
import { TOKEN_CHECK, USER } from "../../constant/user.constant";
import { ACCESS_TOKEN, NON_EXISTENT_TOKEN, REFRESH_TOKEN, VALID_TOKEN } from "../constant/tokenSlice.constant";
import { IToken, ITokenCheck, ITokenStatus } from "../interface/tokenSlice.interface";

const tokenReissue = async (type: AuthTypes): Promise<Partial<IReissueToken>> => {
  try {
    const {
      data: { success, data },
    } = await reissueToken(type);
    return { success, data };
  } catch (err) {
    return { success: false };
  }
};

const tokenCheckAction = async (authType: AuthTypes): Promise<Partial<ITokenCheck>> => {
  try {
    const {
      data: { success },
    } = await checkToken(authType);
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
  async (authType: AuthTypes, { rejectWithValue }) => {
    const tokenStatus: ITokenStatus = {
      type: NON_EXISTENT_TOKEN,
      isLogin: false,
      message: "존재하지 않은 토큰",
    };

    const { success, status } = await tokenCheckAction(authType);

    if (success) {
      tokenStatus.type = VALID_TOKEN;
      tokenStatus.isLogin = true;
      tokenStatus.message = "유효한 토큰";
    } else {
      if (status === 401) {
        const { success, data: token } = await tokenReissue(authType);

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
