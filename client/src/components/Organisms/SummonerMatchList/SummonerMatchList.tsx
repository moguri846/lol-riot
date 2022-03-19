import React from "react";
import Skeleton from "react-loading-skeleton";
import { ComparingWithEnemyType } from "../../../_actions/riot/interface/matchSummary.interface";
import SummonerMatchItem from "../../SummonerMatchItem/SummonerMatchItem";

import * as S from "./style";

interface IProps {
  loading: boolean;
  matchSummary: ComparingWithEnemyType[];
}

const SummonerMatchList = ({ loading, matchSummary }: IProps) => {
  return (
    <>
      {loading ? (
        <>
          <S.MatchList>
            <Skeleton width="100%" height="110px" />
          </S.MatchList>
        </>
      ) : (
        <>
          <S.MatchList>
            {matchSummary.map((match) => (
              <SummonerMatchItem key={match.gameId} match={match} />
            ))}
          </S.MatchList>
        </>
      )}
    </>
  );
};

export default SummonerMatchList;
