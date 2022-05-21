import moment from "moment";
import { reissueToken } from "../../../../API/auth";
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
import { IToken } from "../interface/tokenSlice.interface";

const checkToken = async (): Promise<{ type: string; isLogin: boolean; message: string }> => {
  const accessExpiresIn = parseInt(localStorage.getItem(ACCESS_TOKEN_EXPIRES_IN) as string);
  const Otype = localStorage.getItem(AUTH_TYPE) as string;
  const now = moment().valueOf();
  const accessDiffTime = accessExpiresIn - now;
  const tokenStatus: any = {
    type: NON_EXISTENT_TOKEN,
    isLogin: false,
    message: "존재하지 않은 토큰",
  };

  if (accessDiffTime) {
    // diffTime이 10분 이하 && 2분 이상인 경우
    if (accessDiffTime <= 600000 && accessDiffTime >= 150000) {
      try {
        await reissueTokenAction();
        tokenStatus.type = REISSUE_TOKEN;
        tokenStatus.isLogin = true;
        tokenStatus.message = "토큰 갱신";
      } catch (err: any) {
        tokenStatus.type = FAIL;
        tokenStatus.message = err.message;
      }
      // diffTime이 2분 미만인 경우
    } else if (accessDiffTime < 150000) {
      const refreshExpiresIn = parseInt(localStorage.getItem(REFRESH_TOKEN_EXPIRES_IN) as string);
      const refreshDiffTime = refreshExpiresIn - now;

      if (refreshDiffTime >= 150000) {
        try {
          await reissueTokenAction();
          tokenStatus.type = REISSUE_TOKEN;
          tokenStatus.isLogin = true;
          tokenStatus.message = "토큰 갱신";
        } catch (err: any) {
          tokenStatus.type = FAIL;
          tokenStatus.message = err.message;
        }
      } else {
        try {
          await reissueTokenAction();
          tokenStatus.type = REISSUE_TOKEN;
          tokenStatus.isLogin = true;
          tokenStatus.message = "토큰 갱신";
        } catch (err: any) {
          tokenStatus.type = FAIL;
          tokenStatus.message = err.message;
        }
      }
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
};

const reissueTokenAction = async () => {
  try {
    const {
      data: { data },
    } = await reissueToken("searchMyName");

    saveToken(data);
  } catch (err) {
    console.log("Err", err);
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
