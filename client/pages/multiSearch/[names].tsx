import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { loadingAction, selectLoading } from "../../toolkit/loading/loadingSlice";
import { multiSearchAction } from "../../toolkit/riot/multiSearchSlice/func/multiSearchSlice.func";
import { selectMultiSearch } from "../../toolkit/riot/multiSearchSlice/multiSearchSlice";
import MultiSearch from "../../components/Organisms/MultiSearch/MultiSearch";

const MultiSearchPage = ({ summonerNames }) => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectLoading);
  const multiSearch = useAppSelector(selectMultiSearch);

  useEffect(() => {
    (async () => {
      dispatch(loadingAction({ MultiSearch: true }));

      await dispatch(multiSearchAction(summonerNames));

      dispatch(loadingAction({ multiSearch: false }));
    })();
  }, [summonerNames]);

  return <MultiSearch loading={loading.multiSearch} multiSearch={multiSearch} />;
};

export default MultiSearchPage;

export const getServerSideProps = async ({ query }) => {
  const { names } = query;

  const summonerNames = names.includes(".")
    ? names
        .split(".")
        .map((s) => {
          const [name] = s.split("님");

          return name.trim();
        })
        .slice(0, -1)
    : names.split(",");

  return {
    props: {
      summonerNames,
    },
  };
};
