import type { AppProps } from "next/app";
import MainTemplate from "../components/Templates/MainTemplate/MainTemplate";
import { wrapper } from "../toolkit/store";
import { SnackbarProvider } from "notistack";
import "../styles/globals.css";
import "../components/Molecules/CalendarGraph/style.css";
import "moment/locale/ko";

const MyApp = ({ Component, pageProps }: AppProps) => {
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
