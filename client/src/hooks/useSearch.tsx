import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { summonerInfo, matchInfo, multiSearchInfo } from "../_actions/riot/riotActions";
import { MatchListFilterType } from "../_actions/riot/interface/dispatch.interface";
import { COMPARING_WITH_ENEMY, MULTI_SEARCH, SUMMONER } from "../_actions/riot/constant/riot.constant";
import { RootReducerType } from "../_reducers/rootReducer";
import { loadingAction } from "../_actions/loading/loadingActions";
import { LOADING, FULFILLED } from "../_actions/loading/constant/loading.constant";
import { SummonerType } from "../_actions/riot/interface/summoner.interface";
import useSnackBar from "./useSnackBar";
import { RouterPushType } from "./interface/useSearch.interface";

export interface IUseSearch {
  summonerName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  multiSearch: (summonerNames: string[]) => Promise<void>;
}

const useSearch = (): IUseSearch => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { snackbar } = useSnackBar();

  const state = useSelector((state: RootReducerType) => state);

  const [summonerName, setSummonerName] = useState<string>("");

  useEffect(() => {
    if (location.pathname.includes("/summoner") && state?.riot.summoner.puuid === "") {
      const summonerName = decodeURIComponent(location.pathname.slice(10));
      setSummonerName(summonerName);
      searchSummoner(summonerName, COMPARING_WITH_ENEMY);
    } else if (location.pathname.includes("/multi_search") && state?.riot.multiSearch[0].summonerInfo.puuid === "") {
      const summonerNames = decodeURIComponent(location.pathname.slice(14));
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

      const { puuid } = (await dispatch(summonerInfo(summonerName, type))) as unknown as SummonerType;

      dispatch(loadingAction(FULFILLED, { summoner: false }));

      await dispatch(matchInfo(puuid));

      dispatch(loadingAction(FULFILLED, { gameInfo: false }));
    } catch (err: any) {
      snackbar(err, "error");
    }
  };

  const routerPush = (type: RouterPushType, summonerName: string) => {
    navigate(`/${type.toLocaleLowerCase()}=${summonerName}`);
  };

  return { summonerName, onChange, onEnter, onClick, multiSearch };
};

export default useSearch;
