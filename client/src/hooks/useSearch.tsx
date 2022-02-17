import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { matchDetailInfo, summonerMatchList } from "../actions/common/commonFunc";
import { MatchListFilterType } from "../actions/common/interface/commonFunc.interface";
import { ComparingWithEnemyType } from "../actions/interface/matchSummary.interface";
import { COMPARING_WITH_ENEMY } from "../actions/type";
import { RootReducer } from "../reducers";

export interface IUseSearch {
  summonerName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMatchDetail: (s: ComparingWithEnemyType) => void;
}

const useSearch = (state?: RootReducer): IUseSearch => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams<{ summonerName: string }>();

  useEffect(() => {
    if (params.summonerName) {
      setSummonerName(params.summonerName);
      // searchSummoner(params.summonerName, COMPARING_WITH_ENEMY);
    }
  }, []);

  const [summonerName, setSummonerName] = useState<string>("");

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
      player: s.player.index,
      enemy: s.enemy.index,
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
