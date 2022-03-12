import React from "react";
import styled from "styled-components";
import Header from "./components/Organisms/Header/Header";
import Router from "./routes/Router";
import GlobalStyle from "./styles/GlobalStyle";

const Wrap = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RouterContainer = styled.div`
  width: 760px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Wrap>
        <RouterContainer>
          <Router />
        </RouterContainer>
      </Wrap>
    </>
  );
};

export default App;
