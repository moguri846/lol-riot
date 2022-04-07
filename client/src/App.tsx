import React from "react";
import styled from "styled-components";
import Header from "./components/Organisms/Header/Header";
import Router from "./routes/Router";
import GlobalStyle from "./styles/GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Router />
    </>
  );
};

export default App;
