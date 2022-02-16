import React from "react";
import styled from "styled-components";
import Router from "./routes/Router";
import GlobalStyle from "./styles/GlobalStyle";

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  // width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Wrap>
        <Container>
          <Router />
        </Container>
      </Wrap>
    </>
  );
};

export default App;
