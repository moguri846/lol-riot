import React from "react";
import { useSelector } from "react-redux";
import SummonerTemplate from "../../components/Templates/SummonerTemplate/SummonerTemplate";
import { RootReducerType } from "../../_reducers/rootReducer";

const SummonerPage = () => {
  const state = useSelector((state: RootReducerType) => state.riot);
  const loading = useSelector((state: RootReducerType) => state.loading);

  return (
    <>
      <SummonerTemplate {...state} loading={loading} />
    </>
  );
};

export default SummonerPage;
