import { Routes, Route } from "react-router-dom";

import React from "react";
import IndexPage from "../pages/IndexPage/IndexPage";
import SummonerPage from "../pages/SummonerPage/SummonerPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/summoner=:summonerName" element={<SummonerPage />} />
    </Routes>
  );
};

export default Router;
