import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { wrapper } from "../redux/index";
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SnackbarProvider>
  );
};

export default wrapper.withRedux(MyApp);
