import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { matchDetailInfo, summonerMatchList } from "../_actions/riot/riotActions";
import { MatchListFilterType } from "../_actions/riot/interface/dispatch.interface";
import { ComparingWithEnemyType } from "../_actions/riot/interface/matchSummary.interface";
import { COMPARING_WITH_ENEMY } from "../_actions/riot/constant/riot.constant";
import { RootReducerType } from "../_reducers/rootReducer";

export interface IUseSearch {
  summonerName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMatchDetail: (s: ComparingWithEnemyType) => void;
}

const useSearch = (): IUseSearch => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const state = useSelector((state: RootReducerType) => state);

  const [summonerName, setSummonerName] = useState<string>("");

  useEffect(() => {
    if (location.pathname.includes("/summoner") && state?.riot.summoner.puuid === "") {
      const summonerName = decodeURIComponent(location.pathname.slice(10));
      setSummonerName(summonerName);
      dispatch(summonerMatchList(summonerName, COMPARING_WITH_ENEMY));
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSummonerName(e.currentTarget.value);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (beforeDispatch(summonerName)) {
        searchSummoner(summonerName, COMPARING_WITH_ENEMY);
      }
    }
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (beforeDispatch(summonerName)) {
      searchSummoner(summonerName, COMPARING_WITH_ENEMY);
    }
  };

  const beforeDispatch = (summonerName: string) => {
    if (!summonerName) {
      return false;
    }
    return true;
  };

  const onMatchDetail = (s: ComparingWithEnemyType) => {
    const args = {
      gameId: s.gameId,
      player: s.myIndex,
      enemy: s.enemyIndex,
    };
    dispatch(matchDetailInfo(args));
  };

  const searchSummoner = (summonerName: string, type: MatchListFilterType) => {
    dispatch(summonerMatchList(summonerName, type));
    routerPush(summonerName);
  };

  const routerPush = (summonerName: string) => {
    navigate(`/summoner=${summonerName}`);
  };

  return { summonerName, onChange, onEnter, onClick, onMatchDetail };
};

export default useSearch;
