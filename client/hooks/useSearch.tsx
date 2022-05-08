import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { summonerInfo, matchInfo, multiSearchInfo } from "../redux/actions/riot/riotActions";
import { MatchListFilterType } from "../redux/actions/riot/interface/dispatch.interface";
import { COMPARING_WITH_ENEMY, MULTI_SEARCH, SUMMONER } from "../redux/actions/riot/constant/riot.constant";
import { RootReducerType } from "../redux/reducers/rootReducer";
import { loadingAction } from "../redux/actions/loading/loadingActions";
import { LOADING, FULFILLED } from "../redux/actions/loading/constant/loading.constant";
import { SummonerType } from "../redux/actions/riot/interface/summoner.interface";
import useSnackBar from "./useSnackBar";
import { RouterPushType } from "./interface/useSearch.interface";
import { useRouter } from "next/router";

export interface IUseSearch {
  summonerName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  multiSearch: (summonerNames: string[]) => Promise<void>;
}

const useSearch = (): IUseSearch => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { snackbar } = useSnackBar();

  const state = useSelector((state: RootReducerType) => state);

  const [summonerName, setSummonerName] = useState<string>("");

  useEffect(() => {
    if (router.pathname.includes("/summoner") && state?.riot.summoner.puuid === "") {
      const { name } = router.query as { name: string };

      const summonerName = decodeURIComponent(router.pathname.slice(10));
      setSummonerName(name);
      searchSummoner(name, COMPARING_WITH_ENEMY);
    } else if (router.pathname.includes("/multi_search") && state?.riot.multiSearch[0].summonerInfo.puuid === "") {
      const summonerNames = decodeURIComponent(router.pathname.slice(14));
      setSummonerName(summonerNames);
      multiSearch(summonerNames.split(","));
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSummonerName(e.currentTarget.value);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (checkSearchValue(summonerName)) {
        searchSummonerOrMulti();
      }
    }
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (checkSearchValue(summonerName)) {
      searchSummonerOrMulti();
    }
  };

  const checkSearchValue = (summonerName: string) => {
    if (!summonerName) {
      snackbar("소환사 이름을 입력해주세요!", "warning");
      return false;
    }
    return true;
  };

  const searchSummonerOrMulti = () => {
    if (summonerName.includes(",") || summonerName.includes(".")) {
      if (summonerName.includes(",")) {
        multiSearch(summonerName.split(","));
      } else {
        const names = summonerName
          .split(".")
          .map((summoner) => {
            const [name] = summoner.split("님");
            return name.trim();
          })
          .slice(0, -1);

        multiSearch(names);
      }

      routerPush(MULTI_SEARCH, summonerName);
    } else {
      searchSummoner(summonerName, COMPARING_WITH_ENEMY);
      routerPush(SUMMONER, summonerName);
    }
  };

  const multiSearch = async (summonerNames: string[]) => {
    try {
      dispatch(loadingAction(LOADING, { multiSearch: true }));
      await dispatch(multiSearchInfo(summonerNames));
      dispatch(loadingAction(FULFILLED, { multiSearch: false }));
    } catch (err: any) {
      snackbar(err, "error");
    }
  };

  const searchSummoner = async (summonerName: string, type: MatchListFilterType) => {
    try {
      dispatch(loadingAction(LOADING, { summoner: true, gameInfo: true }));
      // const { puuid } = (await dispatch(summonerInfo(summonerName, type))) as unknown as SummonerType;
      // dispatch(loadingAction(FULFILLED, { summoner: false }));
      // await dispatch(matchInfo(puuid));
      // dispatch(loadingAction(FULFILLED, { gameInfo: false }));
    } catch (err: any) {
      snackbar(err, "error");
    }
  };

  const routerPush = (type: RouterPushType, summonerName: string) => {
    router.push(`/${type.toLocaleLowerCase()}/${summonerName}`);
  };

  return { summonerName, onChange, onEnter, onClick, multiSearch };
};

export default useSearch;
