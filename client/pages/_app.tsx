import type { AppProps } from "next/app";
import MainTemplate from "../components/Templates/MainTemplate/MainTemplate";
import { wrapper } from "../toolkit/store";
import { myInfoAction } from "../toolkit/user/infoSlice/infoSlice";
import { useAppDispatch } from "../hooks/useRedux";
import { tokenStatusUpdate } from "../toolkit/user/tokenSlice/tokenSlice";
import { SnackbarProvider } from "notistack";
import "../styles/globals.css";
import "../components/Molecules/CalendarGraph/style.css";
import "moment/locale/ko";
import moment from "moment";
import { useEffect } from "react";
import { reissueToken } from "../API/auth";

const ACCESS_TOKEN_EXPIRES_IN = "ACCESS_TOKEN_EXPIRES_IN";
const OAUTH_TYPE = "OAUTH_TYPE";
const NON_EXISTENT_TOKEN = "NON_EXISTENT_TOKEN";
const REISSUE_TOKEN = "REISSUE_TOKEN";
const FAIL = "FAIL";
const REFRESH_TOKEN_EXPIRES_IN = "REFRESH_TOKEN_EXPIRES_IN";
const VALID_TOKEN = "VALID_TOKEN";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const dispatch = useAppDispatch();

  const reissueTokenAction = async () => {
    try {
      const {
        data: { data },
      } = await reissueToken("searchMyName");

      const ACCESS_TOKEN = "ACCESS_TOKEN";
      const ACCESS_TOKEN_EXPIRES_IN = "ACCESS_TOKEN_EXPIRES_IN";
      const REFRESH_TOKEN = "REFRESH_TOKEN";
      const REFRESH_TOKEN_EXPIRES_IN = "REFRESH_TOKEN_EXPIRES_IN";

      const saveLocalStorage = (token: any) => {
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

      saveLocalStorage(data.data);
    } catch (err) {
      console.log("Err", err);
    }
  };

  const check = async (): Promise<{ type: string; isLogin: boolean; message: string }> => {
    const accessExpiresIn = parseInt(localStorage.getItem(ACCESS_TOKEN_EXPIRES_IN) as string);
    const Otype = localStorage.getItem(OAUTH_TYPE) as string;
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

  useEffect(() => {
    (async () => {
      const tokenStatus = await check();

      if (tokenStatus.isLogin) {
        dispatch(tokenStatusUpdate(tokenStatus));

        const type = localStorage.getItem("OAUTH_TYPE") as string;

        dispatch(myInfoAction(type));
      }
    })();
  }, []);

  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      autoHideDuration={3500}
    >
      <MainTemplate>
        <Component {...pageProps} />
      </MainTemplate>
    </SnackbarProvider>
  );
};

export default wrapper.withRedux(MyApp);
