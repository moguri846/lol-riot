import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { summonerMatchList } from "../actions/common/commonFunc";
import { MatchListFilterType } from "../actions/common/interface/commonFunc.interface";
import { MATCH_SUMMARY } from "../actions/type";

type UseSearch = [
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
];

const useSearch = (): UseSearch => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams<{ summonerName: string }>();

  useEffect(() => {
    if (params.summonerName) {
      searchSummoner(params.summonerName, MATCH_SUMMARY);
    }
  }, []);

  const [summonerName, setSummonerName] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSummonerName(e.currentTarget.value);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (beforeDispatch(summonerName)) {
        searchSummoner(summonerName, MATCH_SUMMARY);
      }
    }
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (beforeDispatch(summonerName)) {
      searchSummoner(summonerName, MATCH_SUMMARY);
    }
  };

  const beforeDispatch = (summonerName: string) => {
    if (!summonerName) {
      return false;
    }
    return true;
  };

  const searchSummoner = (summonerName: string, type: MatchListFilterType) => {
    dispatch(summonerMatchList(summonerName, type));
    routerPush(summonerName);
  };

  const routerPush = (summonerName: string) => {
    navigate(`/summoner=${summonerName}`);
  };

  return [onChange, onEnter, onClick];
};

export default useSearch;
