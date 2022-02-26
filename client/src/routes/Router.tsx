import { Routes, Route } from "react-router-dom";

import React from "react";
import IndexPage from "../pages/IndexPage/IndexPage";
import SummonerPage from "../pages/SummonerPage/SummonerPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import OAuth from "../components/OAuth";
import Auth from "../hoc/Auth/Auth";

/*
  null => 누구나 가능
  true => 로그인 한 사람만 가능
  false => 로그인 안 한 사람만 가능
*/

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={Auth(IndexPage, null)} />
      <Route path="/summoner=:summonerName" element={Auth(SummonerPage, null)} />
      <Route path="/login" element={Auth(LoginPage, false)} />
      <Route path="/oauth/:type" element={Auth(OAuth, false)} />
    </Routes>
  );
};

export default Router;
