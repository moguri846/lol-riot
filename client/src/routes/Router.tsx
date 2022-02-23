import { Routes, Route } from "react-router-dom";

import React from "react";
import IndexPage from "../pages/IndexPage/IndexPage";
import SummonerPage from "../pages/SummonerPage/SummonerPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import OAuth from "../components/OAuth";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/summoner=:summonerName" element={<SummonerPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth/:type" element={<OAuth />} />
    </Routes>
  );
};

export default Router;
