import React from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../../reducers";
import SearchSummoner from "../../components/Organisms/SearchSummoner/SearchSummoner";
import SummonerTemplate from "../../components/Templates/SummonerTemplate/SummonerTemplate";

const SummonerPage = () => {
  const state = useSelector((state: RootReducer) => state);

  return <>{state.summoner.puuid && <SummonerTemplate {...state} />}</>;
};

export default SummonerPage;
