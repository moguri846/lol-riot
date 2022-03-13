import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { summonerInfo, matchInfo } from "../_actions/riot/riotActions";
import { MatchListFilterType } from "../_actions/riot/interface/dispatch.interface";
import { COMPARING_WITH_ENEMY } from "../_actions/riot/constant/riot.constant";
import { RootReducerType } from "../_reducers/rootReducer";
import { statusAction } from "../_actions/status/statusActions";
import { LOADING, FULFILLED } from "../_actions/status/constant/status.constant";
import { SummonerType } from "../_actions/riot/interface/summoner.interface";
import useSnackBar from "./useSnackBar";

export interface IUseSearch {
  summonerName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSummonerName(e.currentTarget.value);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (beforeDispatch(summonerName)) {
        searchSummoner(summonerName, COMPARING_WITH_ENEMY);
        routerPush(summonerName);
      }
    }
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (beforeDispatch(summonerName)) {
      searchSummoner(summonerName, COMPARING_WITH_ENEMY);
      routerPush(summonerName);
    }
  };

  const beforeDispatch = (summonerName: string) => {
    if (!summonerName) {
      snackbar("소환사 이름을 입력해주세요!", "warning");
      return false;
    }
    return true;
  };

  const searchSummoner = async (summonerName: string, type: MatchListFilterType) => {
    try {
      dispatch(statusAction(LOADING, { summoner: true, match: true }));

      const { puuid } = (await dispatch(summonerInfo(summonerName, type))) as unknown as SummonerType;

      dispatch(statusAction(FULFILLED, { summoner: false }));

      await dispatch(matchInfo(puuid));

      dispatch(statusAction(FULFILLED, { match: false }));
    } catch (err: any) {
      snackbar(err, "error");
    }
  };

  const routerPush = (summonerName: string) => {
    navigate(`/summoner=${summonerName}`);
  };

  return { summonerName, onChange, onEnter, onClick };
};

export default useSearch;
