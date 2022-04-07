import React from "react";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../_reducers/rootReducer";
import Template from "../../components/Templates/MainTemplate/MainTemplate";
import MultiSearch from "../../components/Organisms/MultiSearch/MultiSearch";

const MultiSearchPage = () => {
  const loading = useSelector((state: RootReducerType) => state.loading.multiSearch);
  const multiSearch = useSelector((state: RootReducerType) => state.riot.multiSearch);

  const Content = <MultiSearch loading={loading} multiSearch={multiSearch} />;

  return <Template Content={Content} />;
};

export default MultiSearchPage;
