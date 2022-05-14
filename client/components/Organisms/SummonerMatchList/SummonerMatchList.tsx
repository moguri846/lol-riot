import React from "react";
import Skeleton from "react-loading-skeleton";
import { ComparingWithEnemyType } from "../../../toolkit/riot/gameInfoSlice/interface/gameInfo.interface";
import SummonerMatchItem from "../SummonerMatchItem/SummonerMatchItem";
import "react-loading-skeleton/dist/skeleton.css";

import * as S from "./style";

interface IProps {
  loading: boolean;
  matchSummary: ComparingWithEnemyType[];
}

const SummonerMatchList = ({ loading, matchSummary }: IProps) => {
  return (
    <>
      <S.MatchList>
        {loading ? (
          <>
            <Skeleton width="100%" height="110px" />
          </>
        ) : (
          <>
            {matchSummary.map((match) => (
              <SummonerMatchItem key={match.gameId} match={match} />
            ))}
          </>
        )}
      </S.MatchList>
    </>
  );
};

export default SummonerMatchList;
