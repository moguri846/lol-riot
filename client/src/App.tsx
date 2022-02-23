import React from "react";
import styled from "styled-components";
import { oAuthLogout } from "./API/oauth";
import Header from "./components/Organisms/Header/Header";
import Router from "./routes/Router";
import GlobalStyle from "./styles/GlobalStyle";

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Main = styled.main`
  width: 960px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const logoutOAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const type = localStorage.getItem("OAUTH_TYPE") as string;

      const { data } = await oAuthLogout(type);

      if (data.success) {
        localStorage.clear();
      }
    } catch (err: any) {
      alert(`무언가 이상해요! ${err.message}`);
    }
  };

  const goToOAuthLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    const link = e.currentTarget.dataset.link as string;
    window.location.href = link;
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <Wrap>
        <Main>
          <button onClick={logoutOAuth}>로그아웃</button>
          <Router />
        </Main>
      </Wrap>
    </>
  );
};

export default App;
