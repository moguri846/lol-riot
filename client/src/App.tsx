import React from "react";
import styled from "styled-components";
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
  width: 760px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Wrap>
        <Main>
          <Router />
        </Main>
      </Wrap>
    </>
  );
};

export default App;
