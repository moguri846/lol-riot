import React from "react";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../_reducers/rootReducer";

import MultiSearch from "../../components/Organisms/MultiSearch/MultiSearch";

const MultiSearchPage = () => {
  const loading = useSelector((state: RootReducerType) => state.loading.multiSearch);
  const multiSearch = useSelector((state: RootReducerType) => state.riot.multiSearch);

  return <MultiSearch loading={loading} multiSearch={multiSearch} />;
};

export default MultiSearchPage;
